import type { AuthApiMiddleware } from '../types/Request';

const logout: AuthApiMiddleware = (req, res) => {
  req.logOut();
  res.status(204).end();
};

export default logout;
