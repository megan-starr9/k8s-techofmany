import type { AuthApiMiddleware } from '../types/Request';

const getSessionUser: AuthApiMiddleware = (req, res) => {
  if (!req.user) {
    res.status(404).end();
  }
  res.status(200).json({ success: true, user: req.user });
};

export default getSessionUser;
