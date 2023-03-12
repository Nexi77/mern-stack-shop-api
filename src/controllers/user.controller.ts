import { Request, Response } from 'express';
import { CreateUserInput } from 'src/schema/user.schema';
import { createUser } from 'src/services/user.service';
import log from '../utils/logger';

export const createUserHandler = async (
  req: Request<object, object, CreateUserInput['body']>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (ex: any) {
    log.error(ex);
    return res.status(409).send(ex.message);
  }
};
