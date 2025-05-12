import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser, deleteUser, putUser } from '../services/service.js';
import { isValidUUID } from '../utils/validators.js';
import { sendError } from '../utils/errorHandler.js';
import { ApiUser } from 'types/user.js';

export const putUserController = (req: IncomingMessage, res: ServerResponse) => {
  const id = req.url?.split('/').at(-1) as string;
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const userData: ApiUser = JSON.parse(body);
    try {
      if (!isValidUUID(id)) {
        throw new Error('not uuid');
      }
      const user = putUser(id, userData);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (err: any) {
      if (err.message == 'not uuid') {
        sendError(res, 400, 'not uuid');
      } else {
        sendError(res, 404, `${id} doesn't exist`);
      }
    }
  });
};

export const deleteUserController = (req: IncomingMessage, res: ServerResponse) =>{
  const id = req.url?.split('/').at(-1) as string;
    try {
      if (!isValidUUID(id)) {
        throw new Error('not uuid');
      }
      const deletedUser = deleteUser(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(deletedUser));
    } catch (err: any) {
      if (err.message == 'not uuid') {
        sendError(res, 400, 'not uuid');
      } else {
        sendError(res, 404, `${id} doesn't exist`);
      }
    }
}

export const postUserController = (req: IncomingMessage, res: ServerResponse)=>{
  let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const newUser = JSON.parse(body);
      createUser(newUser);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
}

export const gettUserController = (req: IncomingMessage, res: ServerResponse)=>{
  const urlArr = req.url?.split('/') as [string];
    console.log(urlArr);
    if (urlArr.length < 4) {
      console.log(urlArr);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const users = getAllUsers();
      res.end(JSON.stringify(users));
    } else {
      const id = req.url?.split('/').at(-1) as string;
      try {
        if (!isValidUUID(id)) {
          throw new Error('not uuid');
        }
        const user = getUserById(id);
        if (!user) {
          throw new Error();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } catch (err: any) {
        if (err.message == 'not uuid') {
          sendError(res, 400, 'not uuid');
        } else {
          sendError(res, 404, `${id} doesn't exist`);
        }
      }
    }
}