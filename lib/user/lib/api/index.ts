import nextConnect from 'next-connect'
import getUser from './getUser';
import getUserList from './getUserList';
import PATHS from './paths';

const handler = nextConnect()

handler
  .get(PATHS.GET_USER_LIST, getUserList)
  .get(`${PATHS.GET_USER}/:uid`, getUser);


export default handler;
