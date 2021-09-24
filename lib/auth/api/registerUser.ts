import {
  createUser
} from '@techofmany/user/db';
import {
  generateSalt,
  hashPassword,
} from '../lib/encrypt';

export default async function registerUser(req, res) {
  const { username, password, email } = req.body;
  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);

  const newUser = await createUser({
    username,
    password: hashedPassword,
    email,
    salt,
  });
  res.status(200).json({ success: true, user: newUser });
}
