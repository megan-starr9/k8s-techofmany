import passportLib from 'passport';
import { findUser } from '@techofmany/user/lib/storage';
import type { User } from '../types/User';
import {
  emailLogin,
  emailRegister,
} from './methods';

// @todo remove dependency on db?
// Serialize our user id into the session on login
passportLib.serializeUser((user: User, done) => {
  done(null, user.id);
});

// pull our user from the session on page visit
passportLib.deserializeUser( async (id: string, done) => {
    const user = await findUser(id);
    if (!user) {
      done(null, false);
    }
    done(null, user);
});

export const METHODS = {
  EMAIL_LOGIN: 'local.login',
  EMAIL_REGISTER: 'local.register',
}

passportLib.use(METHODS.EMAIL_LOGIN, emailLogin);
passportLib.use(METHODS.EMAIL_REGISTER, emailRegister);

export default function passport() {
  return passportLib;
}
