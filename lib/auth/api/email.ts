import type { AuthApiMiddleware } from '../types/Request';
import passport, {
  METHODS,
} from '../lib/passport'

const authLib = passport();

const emailLogin: AuthApiMiddleware = (req, res) => {
  authLib.authenticate([METHODS.EMAIL_LOGIN, METHODS.EMAIL_REGISTER])(req, res, () => {
    res.status(200).json({ success: true, user: req.user });
  });
};

export default emailLogin;
