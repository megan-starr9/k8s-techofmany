import nextConnect from 'next-connect'
import authSession from './authSession';
import emailAuth from './email';
import getSessionUser from './getSessionUser';
import logout from './logout';
import PATHS from './paths';

const handler = nextConnect();

handler
  .use(authSession)
  .post(PATHS.EMAIL, emailAuth)
  .get(PATHS.GET_SESSION_USER, getSessionUser)
  .get(PATHS.LOGOUT, logout);

export default handler;
