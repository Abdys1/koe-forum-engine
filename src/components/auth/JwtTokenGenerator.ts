import { Options } from 'argon2';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

async function signToken(payload: string | Buffer | object, secretKey: Secret, expiresIn: number): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn }, (err: Error | null, signedToken: string | undefined) => {
      if (err) { reject(err); }
      resolve(signedToken);
    });
  });
}

async function verifyToken(token: string, secretKey: Secret): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) { reject(err); }
      resolve(decoded);
    });
  });
}

export { signToken, verifyToken };
