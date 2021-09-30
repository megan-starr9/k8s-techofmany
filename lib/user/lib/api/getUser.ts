import { NextApiHandler } from 'next';
import { findUser } from '../storage';

const getUser: NextApiHandler = async (req, res) => {
  const { slug } = req.query;
  const user = await findUser(Array.isArray(slug) ? slug.pop() : slug);
  res.status(200).json({ success: true, user });
};

export default getUser;
