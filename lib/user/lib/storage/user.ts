import {
  insert,
  findById,
  find,
  findPage,
} from '@techofmany/storage';
import type {
  Creator,
  Filter,
} from '@techofmany/storage/types';
import type {
  UserRaw,
  User,
} from '../../types/User';

const TABLE_NAME = 'users';

function transform(user: UserRaw): User {
  return {
    _id: user._id,
    id: user._id.toString(),
    username: user.username,
    email: user.email,
  };
}

export async function createUser(data: Creator<UserRaw>) {
  const users = await insert<UserRaw>(TABLE_NAME, data);
  return transform(users.shift());
}

export async function findUser(id: string) {
  const users = await findById<UserRaw>(TABLE_NAME, id);
  return transform(users.shift());
}

export async function getUserCredentials(id: string) {
  const users = await findById<UserRaw>(TABLE_NAME, id);
  return {
    salt: users[0].salt,
    password: users[0].password,
  };
}

export async function searchUsers(criterion: Filter<UserRaw>, page = null, limit = null) {
  const users = (page && limit)
    ? await findPage<UserRaw>(TABLE_NAME, criterion, page, limit)
    : await find<UserRaw>(TABLE_NAME, criterion);
  return users.map(transform);
}
