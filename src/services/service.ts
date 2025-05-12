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