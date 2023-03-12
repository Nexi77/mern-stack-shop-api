import { Express } from 'express';
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler,
} from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (_, res) => res.sendStatus(200));
  app.post('/api/users', validate(createUserSchema), createUserHandler);
  app.post(
    '/api/sessions',
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get('/api/sessions', requireUser, getUserSessionsHandler);
  app.delete('/api/sessions', requireUser, deleteUserSessionHandler);
}

export default routes;
