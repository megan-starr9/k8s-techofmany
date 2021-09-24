import nextConnect from 'next-connect'
import authSession from './authSession';
import registerUser from './registerUser';
import emailLogin from './emailLogin';
import getSessionUser from './getSessionUser';
import logout from './logout';
import PATHS from './paths';

const handler = nextConnect();

handler
  .use(authSession)
  .post(PATHS.LOGIN, emailLogin)
  .post(PATHS.REGISTER, registerUser)
  .get(PATHS.GET_SESSION_USER, getSessionUser)
  .get(PATHS.LOGOUT, logout);

export default handler;
