import { v4 as uuidv4 } from 'uuid';
import { ApiUser } from 'types/user.js';

let users: ApiUser[] = [];

export const getAllUsers = () => users;

export const getUserById = (id: string) => users.find(user => user.id === id);

export const createUser = (userData: Omit<ApiUser, 'id'>) => {
  const newUser = { id: uuidv4(), ...userData };
  users.push(newUser);
  return newUser;
};
export const deleteUser = (id: string) => {
  const user = getUserById(id);
  if (!user) {
    throw new Error('user not found');
  }
  const newUsers = users.filter(elem => elem.id != id);
  users = newUsers;
  return user;
};

export const putUser = (id: string, userData: ApiUser) => {
  const user = getUserById(id);
  if (!user) {
    throw new Error('user not found');
  }
  let key: keyof ApiUser;
  for (key in userData) {
    console.log(key);
    if (Object.keys(user).includes(key)) {
      console.log('yeah');
      // @ts-ignore
      user[key] = userData[key];
    }
  }
  return user;
};
