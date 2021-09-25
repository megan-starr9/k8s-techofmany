import nextConnect from 'next-connect';
import passport from '../lib/passport';
import session from '../lib/session';

const authLib = passport();
const TOKEN = process.env.TOKEN_SECRET;

const authSession = nextConnect()
  .use(
    session({
      name: 'sess',
      secret: TOKEN,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  .use(authLib.initialize())
  .use(authLib.session());

export default authSession;
