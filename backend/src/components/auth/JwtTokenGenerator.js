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
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) { reject(err); }
      resolve(decoded);
    });
  });
}

export { signToken, verifyToken };
