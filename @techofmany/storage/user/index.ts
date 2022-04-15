import {
  insert,
  findById,
  find,
  findPage,
} from '../';
import type {
  Creator,
  Filter,
} from '../types';
import type {
  UserRaw,
  User,
} from '../types/User';

const TABLE_NAME = 'users';

function transform(user: UserRaw): User {
  return {
    _id: user._id,
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    password: user.password,
    salt: user.salt,
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

export async function searchUsers(criterion: Filter<UserRaw>, page = null, limit = null) {
  const users = (page && limit)
    ? await findPage<UserRaw>(TABLE_NAME, criterion, page, limit)
    : await find<UserRaw>(TABLE_NAME, criterion);
  return users.map(transform);
}
