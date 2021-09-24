import LocalStrategy from 'passport-local';
import {
  searchUsers,
  getUserCredentials,
  UserResult,
} from '@techofmany/user/db';
import { hashPassword } from '../../lib/encrypt';

const localPrefs = {
  passReqToCallback: false,
  usernameField: 'username',
  passwordField: 'password'
};

async function checkPassword(user: UserResult, password: string) {
  const cred = await getUserCredentials(user._id);
  return hashPassword(password, cred.salt) === cred.password;
}

const strategy = new LocalStrategy(
  localPrefs,
  async (username, password, done) => {
    if (!username || !password) {
      done(null, false, { message: 'Must provide credentials.' });
    }
    const match = await searchUsers({ username });

    if (!match.length || !await checkPassword(match[0], password)) {
      done(null, false, { message: 'Invalid credentials.' });
    }

    done(null, match[0]);
  },
);

export default strategy;
