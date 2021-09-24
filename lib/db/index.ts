import type {
   ObjectId,
 } from 'mongodb';
import {
  connect as connectDB,
  disconnect,
  insert,
  update,
  remove,
  find,
  findPage,
  addIndex,
} from './mongodb';

export async function connect(): Promise<void> {
  await connectDB();

  // disconnect if node exits
  process.on('SIGINT', async () => {
    await disconnect();
    process.exit(0);
  });
}

export {
  insert,
  update,
  remove,
  find,
  findPage,
  addIndex,
};

export type Result<T> = T & {
  _id: ObjectId,
};

export type Identifier = ObjectId;
