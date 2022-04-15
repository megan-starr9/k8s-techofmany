import type { Result } from '@techofmany/storage/types';

type UserFields = {
  username: string,
  email: string,
  password: string,
  salt: string,
}

export type UserRaw = Result<UserFields>;

export type User = Result<UserFields> & {
  id: string,
};
