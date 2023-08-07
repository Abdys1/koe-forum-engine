import jwt from 'jsonwebtoken';

async function signToken(payload, secretKey, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secretKey, (err, signedToken) => {
      if (err) { reject(err); }
      resolve(signedToken);
    }, { expiresIn });
  });
}

async function verifyToken(token, secretKey) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err) => {
      if (err) { reject(err); }
      resolve(true);
    });
  });
}

export { signToken, verifyToken };
