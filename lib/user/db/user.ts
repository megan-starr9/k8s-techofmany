import {
  insert,
  find,
  Result,
  Identifier,
} from '@techofmany/db';

const TABLE_NAME = 'users';

type UserPublic = {
  username: string,
  email: string,
}

type User = UserPublic & {
  password: string,
  salt: string,
};

export type UserResult = Result<UserPublic>;

function transform(user: Result<User>): UserResult {
  return {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
}

export async function createUser(data: User) {
  const users = await insert<User>(TABLE_NAME, data);
  return transform(users[0]);
}

export async function findUser(id: Identifier) {
  const users = await find<User>(TABLE_NAME, { _id: id });
  return transform(users[0]);
}

export async function getUserCredentials(id: Identifier) {
  const users = await find<User>(TABLE_NAME, { _id: id });
  return {
    salt: users[0].salt,
    password: users[0].password,
  };
}

export async function searchUsers(criterion: Partial<UserPublic>) {
  const users = await find<User>(TABLE_NAME, criterion);
  return users.map(transform);
}
