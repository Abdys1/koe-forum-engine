import jwt, { Secret, VerifyErrors } from 'jsonwebtoken';
import { ForumJwtPayload } from '@src/components/auth/types';

async function signToken(payload: string | Buffer | object, secretKey: Secret, expiresIn: string | number | undefined): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn }, (err: Error | null, signedToken: string | undefined) => {
      if (err) { reject(err); }
      resolve(signedToken);
    });
  });
}

// TODO ennek a típusain talán még alakítani kell (decoded: unkown)
async function verifyToken(token: string, secretKey: Secret): Promise<ForumJwtPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: unknown) => {
      if (err) { reject(err); }
      resolve(decoded as ForumJwtPayload);
    });
  });
}

export { signToken, verifyToken };
