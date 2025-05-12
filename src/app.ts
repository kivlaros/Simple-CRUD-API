import { createServer } from 'http';
import { sendError } from './utils/errorHandler.js';
import { handleUsersRoute } from './routes/routes.js';
import { IncomingMessage, ServerResponse } from 'http';

export const app = createServer((req:IncomingMessage, res:ServerResponse) => {
  try {
    if (req.url?.startsWith('/api/users')) {
      handleUsersRoute(req, res);
      //res.end('test your lack')
    } else {
      sendError(res, 404, 'Route not found');
    }
  } catch (err) {
    sendError(res, 500, 'Internal Server Error');
  }
});
