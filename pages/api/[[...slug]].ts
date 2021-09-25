import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from "next";
import {
  connect,
} from '@techofmany/db';

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

if (process.env.ENABLE_AUTH) {
  try {
    const authApi = require('@techofmany/auth/api');
    handler.use(authApi.default);
  } catch(e) {
    throw new Error("Run 'npm install @techofmany/auth' to enable authentication.");
  }
}
if (process.env.ENABLE_PROFILES) {
  try {
    const userApi = require('@techofmany/user/api');
    handler.use(userApi.default);
  } catch(e) {
    throw new Error("Run 'npm install @techofmany/user' to enable user profiles.");
  }
}

export default handler;
