import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser, deleteUser, putUser } from '../services/service.js';
import { isValidUUID } from '../utils/validators.js';
import { sendError } from '../utils/errorHandler.js';
import { putUserController } from '../controllers/controller.js';

export const handleUsersRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
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
  if (req.method === 'POST') {
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
  if (req.method === 'DELETE') {
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
  if (req.method === 'PUT') {
    putUserController(req, res);
  }
};
