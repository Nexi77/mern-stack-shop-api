import { envConfig } from 'config/config.env';
import { Request, Response } from 'express';
import { createSession } from 'src/services/session.service';
import { validatePassword } from 'src/services/user.service';
import { signJWT } from 'src/utils/jwt.utils';

const createUserSessionHandler = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send('Invalid email or password');
  const session = await createSession(user._id, req.get('user-agent') || '');
  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: envConfig.ACCESS_TOKEN_TTL }
  );
  const refreshToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: envConfig.REFRESH_TOKEN_TTL }
  );
  return res.send({ accessToken, refreshToken });
};

export { createUserSessionHandler };
