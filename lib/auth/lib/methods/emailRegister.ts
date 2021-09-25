import { Strategy as LocalStrategy } from 'passport-local';
import {
  createUser,
} from '@techofmany/user/store';
import {
  generateSalt,
  hashPassword,
} from '../../lib/encrypt';

const emailLogin = new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password'
  },
  async (req, username, password, done) => {
    const { email } = req.body;
    if (!username || !password || !email) {
      return done(null, false, { message: 'Must provide required fields.' });
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(password, salt);

    const newUser = await createUser({
      username,
      password: hashedPassword,
      email,
      salt,
    });

    return done(null, newUser);
  },
);

export default emailLogin;
