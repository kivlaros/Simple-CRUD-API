import { IncomingMessage, ServerResponse } from 'http';
import { putUserController, deleteUserController, postUserController, gettUserController } from '../controllers/controller.js';

export const handleUsersRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'GET') {
    gettUserController(req, res)
  }
  if (req.method === 'POST') {
    postUserController(req, res)
  }
  if (req.method === 'DELETE') {
    deleteUserController(req, res)
  }
  if (req.method === 'PUT') {
    putUserController(req, res);
  }
};
