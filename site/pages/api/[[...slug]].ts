import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import {
  connect,
} from '@techofmany/storage';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(async (req, res, next) => {
    try {
      await connect();
      next();
    } catch(e) {
      console.log(e);
      res.status(500).end();
    }
  });

try {
  const authApi = require('@techofmany/auth/lib/api');
  handler.use(authApi.default);
} catch(e) {
  console.info("Run 'npm install @techofmany/auth' to enable authentication.");
}

try {
  const userApi = require('@techofmany/user/lib/api');
  handler.use(userApi.default);
} catch(e) {
  console.info("Run 'npm install @techofmany/user' to enable user profiles.");
}

export default handler;