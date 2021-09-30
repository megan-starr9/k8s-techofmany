import axios from 'axios';
import PATHS from '../lib/api/paths';

/**
 * Get all users
 */
export async function getUserList() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/${PATHS.GET_USER_LIST}`);
  return response.data ? response.data.users : null;
}

/**
 * Get user with given id
 */
export async function getUser(id: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/${PATHS.GET_USER}/${id}`);
  return response.data ? response.data.user : null;
}
