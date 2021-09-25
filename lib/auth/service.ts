import axios from 'axios';
import PATHS from './api/paths';
import type {
  UserRegister,
  UserLogin,
} from './types/Forms';

/**
 * Get current session user
 */
export async function getSessionUser() {
  const response = await axios.get(PATHS.GET_SESSION_USER);
  return response.data ? response.data.user : null;
}

/**
 * Authenticate a user via email
 */
export async function emailAuthentication(userData: UserRegister | UserLogin) {
  const response = await axios.post(PATHS.EMAIL, userData);
  return response.data ? response.data.user : null;
}

/**
 * Log a user in
 */
export async function logoutUser() {
  return await axios.get(PATHS.LOGOUT);
}
