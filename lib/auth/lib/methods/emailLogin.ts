import { Strategy as LocalStrategy } from 'passport-local';
import {
  searchUsers,
  getUserCredentials,
} from '@techofmany/user/store';
import type { User } from '../../types/User';
import { hashPassword } from '../../lib/encrypt';

// @todo remove dependency on db?
async function checkPassword(user: User, password: string) {
  const cred = await getUserCredentials(user.id);
  return hashPassword(password, cred.salt) === cred.password;
}

const emailLogin = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    if (!username || !password) {
      return done(null, false, { message: 'Must provide credentials.' });
    }
    const match = await searchUsers({ username });

    if (!match.length || !await checkPassword(match[0], password)) {
      return done(null, false, { message: 'Invalid credentials.' });
    }

    return done(null, match[0]);
  },
);

export default emailLogin;
