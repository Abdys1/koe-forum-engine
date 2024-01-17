import jwt, { Secret } from 'jsonwebtoken';

async function signToken(payload: string | Buffer | object, secretKey: Secret, expiresIn: string | number | undefined) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, { expiresIn }, (err: any, signedToken: any) => {
      if (err) { reject(err); }
      resolve(signedToken);
    });
  });
}

async function verifyToken(token: string, secretKey: Secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err: any, decoded: any) => {
      if (err) { reject(err); }
      resolve(decoded);
    });
  });
}

export { signToken, verifyToken };
