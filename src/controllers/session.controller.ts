import { envConfig } from 'config/config.env';
import { Request, Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import {
  createSession,
  findSessions,
  updateSession,
} from 'src/services/session.service';
import { validatePassword } from 'src/services/user.service';
import { signJWT } from 'src/utils/jwt.utils';

const createAccessToken = (object: object, options?: SignOptions) => {
  return signJWT(object, {
    expiresIn: envConfig.ACCESS_TOKEN_TTL,
    ...options,
  });
};

const createUserSessionHandler = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send('Invalid email or password');
  const session = await createSession(user._id, req.get('user-agent') || '');
  const accessToken = createAccessToken({ ...user, session: session._id });
  const refreshToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: envConfig.REFRESH_TOKEN_TTL }
  );
  return res.send({ accessToken, refreshToken });
};

const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId: string = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
};

const deleteUserSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user?.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};

export {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteUserSessionHandler,
  createAccessToken,
};
