import axios from 'axios';
import PATHS from './api/paths';

/**
 * Get current session user
 */
export async function getCurrentUser() {
  const response = await axios.get(PATHS.GET_SESSION_USER);
  return response.data ? response.data.user : null;
}

/**
 * Register a user
 */
export async function registerUser(userData) {
  const response = await axios.post(PATHS.REGISTER, userData);
  return response.data ? response.data.newUser : null;
}

/**
 * Log a user in
 */
export async function loginUser(userData) {
  const response = await axios.post(PATHS.LOGIN, userData);
  return response.data.user;
}

/**
 * Log a user in
 */
export async function logoutUser() {
  return await axios.get(PATHS.LOGOUT);
}
