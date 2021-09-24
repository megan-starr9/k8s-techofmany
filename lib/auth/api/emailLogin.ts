import passport from '../lib/passport'

const authLib = passport('email');

export default function emailLogin(req, res) {
  authLib.authenticate('local')(req, res, () => {
    res.status(200).json({ success: true, user: req.user });
  });
}
