import {
  MongoClient,
  Db,
  ObjectId,
} from 'mongodb';
import type {
  Result,
  Creator,
  Filter,
} from '../types';

let client: MongoClient;
let db: Db;

const user = process.env.MONGODB_USERNAME;
const passwd = process.env.MONGODB_PASSWORD;
const host = process.env.MONGODB_HOST;
const port = process.env.MONGODB_PORT;
const dbName = process.env.MONGODB_DATABASE;

export async function connect(): Promise<void> {
  if (client && db) {
    // Cut out early if we are already connected
    console.log("LEAVING EARLY");
    return;
  }

 await new Promise((resolve, reject) => {
   console.log(`mongodb://${user}:${passwd}@${host}:${port}`);
   MongoClient.connect(`mongodb://${user}:${passwd}@${host}:${port}`, function(err, client) {
     console.log("CONNECTING");
     if (err) reject(err);
     try {
       client = client;
       db = client.db(dbName);
       resolve(null);
     } catch(e) {
       reject(e);
     }
   });
 });
}

export async function disconnect(): Promise<void> {
  if (client) {
    console.log("DISCONNECTING");
    await client.close();
    client = null;
    db = null;
  }
}

export async function insert<Schema>(table: string, data: Creator<Schema> | Array<Creator<Schema>>): Promise<Array<Result<Schema>>> {
  if (!table || !data) {
    return [];
  }
  if (Array.isArray(data)) {
    const newIds = (await db.collection(table).insertMany(data)).insertedIds;
    return await db.collection(table).find({ _id: { $in: newIds } }).toArray() as Array<Result<Schema>>;
  }
  const newId = (await db.collection(table).insertOne(data)).insertedId;
  return await db.collection(table).find({ _id: newId }).toArray() as Array<Result<Schema>>;
}

export async function update<Schema>(table: string, match: Filter<Schema>, changes: Partial<Schema>) {
  if (!table || !match || !changes) {
    return;
  }
  await db.collection(table).updateMany(match, { $set: changes });
}

export async function remove<Schema>(table: string, match: Filter<Schema>): Promise<void> {
  if (!table || !match) {
    return;
  }
  await db.collection(table).deleteMany(match);
}

export async function findById<Schema>(table: string, id: string | Array<string>, limit?: number) {
  if (!table || !id) {
    return [];
  }
  const match = Array.isArray(id)
    ? { _id: { $in: id.map((value) => new ObjectId(value)) } }
    : { _id: new ObjectId(id) };

  if (limit) {
    return await db.collection(table).find(match).limit(limit).toArray() as Array<Result<Schema>>;
  }
  return await db.collection(table).find(match).toArray() as Array<Result<Schema>>;
}

export async function find<Schema>(table: string, match: Filter<Schema>, limit?: number): Promise<Array<Result<Schema>>> {
  if (!table || !match) {
    return [];
  }
  if (limit) {
    return await db.collection(table).find(match).limit(limit).toArray() as Array<Result<Schema>>;
  }
  return await db.collection(table).find(match).toArray() as Array<Result<Schema>>;
}

export async function findPage<Schema>(table: string, match: Filter<Schema>, page: number, pageSize: number): Promise<Array<Result<Schema>>> {
  if (!table || !match || !page || !pageSize) {
    return [];
  }
  const start = (page - 1) * pageSize;
  return await db.collection(table).find(match).skip(start).limit(pageSize).toArray() as Array<Result<Schema>>;
}

export async function addIndex(table: string, indexes: string | any): Promise<void> {
  if (!table || !indexes) {
    return;
  }
  await db.collection(table).createIndex(indexes);
}
