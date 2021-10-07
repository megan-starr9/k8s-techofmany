import {
  connect as connectDB,
  disconnect,
  insert,
  update,
  remove,
  find,
  findById,
  findPage,
  addIndex,
} from './lib/mongodb';

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
  findById,
  findPage,
  addIndex,
  disconnect,
};
