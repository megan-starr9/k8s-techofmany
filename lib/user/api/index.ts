import nextConnect from 'next-connect'
import getUser from './getUser';
import getUserList from './getUserList';
import PATHS from './paths';

const handler = nextConnect()

handler
  .get(`${PATHS.GET_USER}/:id`, getUser)
  .get(PATHS.GET_USER_LIST, getUserList);

export default handler;
