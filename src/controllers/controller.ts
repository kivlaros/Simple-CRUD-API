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
