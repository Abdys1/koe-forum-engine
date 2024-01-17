function useAuthMiddleware(verifyToken, publicPaths) {
  return async (req, res, next) => {
    try {
      if (!publicPaths.includes(req.path)) {
        const token = req.headers.Authorization.split(' ')[1];
        await verifyToken(token);
      }
      next();
    } catch (err) {
      res.status(403).send();
    }
  };
}

export default useAuthMiddleware;
