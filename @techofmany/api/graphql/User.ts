import {
  objectType,
  queryField,
  list,
  stringArg,
  intArg,
  nonNull,
} from "nexus";
import {
  searchUsers,
  findUser,
  createUser,
} from '@techofmany/storage/user';

export const User = objectType({
    name: "User",
    definition(t) {
        t.nonNull.string("id");
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password");
        t.nonNull.string("salt");
    },
});

export const GetUsers = queryField('users', {
  type: list('User'),
  args: {
    username: stringArg(),
    email: stringArg(),
    page: intArg(),
    limit: intArg(),
  },
  resolve(parent, args, context, info) {
      const { username, email, page, limit } = args;
      return searchUsers({ username, email }, page, limit);
  },
});

export const GetUser = queryField('user', {
  type: 'User',
  args: {
    id: nonNull(stringArg()),
  },
  resolve(parent, args, context, info) {
      return findUser(args.id);
  },
});
