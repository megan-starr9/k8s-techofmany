import type { Result } from '@techofmany/storage/types';

type UserPublicFields = {
  username: string,
  email: string,
}

type UserPrivateFields =  {
  password: string,
  salt: string,
};

export type UserRaw = Result<UserPrivateFields & UserPublicFields>;

export type User = Result<UserPublicFields> & {
  id: string,
};