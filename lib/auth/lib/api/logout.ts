import type { AuthApiMiddleware } from '../../types/Request';

const logout: AuthApiMiddleware = (req, res) => {
  req.logOut();
  return res.status(204).end();
};

export default logout;
