import type {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import type { RequestHandler } from 'next-connect';
import type { User } from './User';

export type Session = Record<string, unknown>;
export type AuthApiRequest = NextApiRequest & {
  session: Session;
  user: User;
  logOut: () => void;
};

export type AuthApiMiddleware = RequestHandler<AuthApiRequest, NextApiResponse>;
