import { createServer } from 'http';
//import { handleUsersRoute } from './routes/userRoutes';
import { sendError } from './utils/errorHandler.js';

export const app = createServer((req, res) => {
  try {
    if (req.url?.startsWith('/api/users')) {
      //handleUsersRoute(req, res);
    } else {
      sendError(res, 404, 'Route not found');
    }
  } catch (err) {
    sendError(res, 500, 'Internal Server Error');
  }
});
