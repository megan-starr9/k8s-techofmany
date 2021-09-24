import passportLib from 'passport';
import { findUser } from '@techofmany/user/db';
import emailProvider from './provider/email';

// Serialize our user id into the session on login
passportLib.serializeUser((user, done) => {
  done(null, user.id);
});

// pull our user from the session on page visit
passportLib.deserializeUser( async (id, done) => {
    const user = await findUser({ id });
    if (!user) {
      done(null, false, { message: `No user found with id ${id}` });
    }
    done(null, user);
});

export default function passport(provider: string) {
  if (provider === 'email') {
    passportLib.use(emailProvider);
  }

  return passportLib;
}
