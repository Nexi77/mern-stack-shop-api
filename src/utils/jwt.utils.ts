import { SignOptions, sign, verify } from 'jsonwebtoken';
import { envConfig } from 'config/config.env';

const privateKey = envConfig.PRIVATE_KEY;
const publicKey = envConfig.PUBLIC_KEY;

const signJWT = (object: object, options?: SignOptions | undefined) => {
  return sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

const verifyJWT = (token: string) => {
  try {
    const decoded = verify(token, publicKey);
    return { valid: true, expired: false, decoded };
  } catch (ex: any) {
    return {
      valid: false,
      expired: ex.message === 'jwt expired',
      decoded: null,
    };
  }
};

export { signJWT, verifyJWT };
