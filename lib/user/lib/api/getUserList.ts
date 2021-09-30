import { NextApiHandler } from 'next';
import { searchUsers } from '../storage';

const getUserList: NextApiHandler = async (req, res) => {
  const users = await searchUsers({}, req.query.page, req.query.limit);
  res.status(200).json({ success: true, users });
};

export default getUserList;
