import {
  MongoClient,
  OptionalId,
  WithId,
  FilterQuery,
  UpdateQuery,
  Db,
} from 'mongodb';

let client: MongoClient;
let db: Db;

export async function connect(): Promise<void> {
  const connection = "mongodb://mongo:27017";
  // Database Name - this will be env controlled!
  const dbName = 'techofmany';

  if (client && db) {
    // Cut out early if we are already connected
    return;
  }

 await new Promise((resolve, reject) => {
   MongoClient.connect(connection, function(err, client) {
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
    await client.close();
    client = null;
    db = null;
  }
}

export async function insert<Schema>(table: string, data: OptionalId<Schema> | Array<OptionalId<Schema>>): Promise<Array<WithId<Schema>>> {
  if (!table || !data) {
    return [];
  }
  if (Array.isArray(data)) {
    const records = await db.collection(table).insertMany(data);
    return records.ops;
  }
  const records = await db.collection(table).insertOne(data);
  return records.ops;
}

export async function update<Schema>(table: string, match: FilterQuery<Schema>, changes: UpdateQuery<Schema>) {
  if (!table || !match || !changes) {
    return;
  }
  await db.collection(table).updateMany(match, { $set: changes });
}

export async function remove<Schema>(table: string, match: FilterQuery<Schema>): Promise<void> {
  if (!table || !match) {
    return;
  }
  await db.collection(table).deleteMany(match);
}

export async function find<Schema>(table: string, match: FilterQuery<Schema>, limit?: number): Promise<Array<WithId<Schema>>> {
  if (!table || !match) {
    return [];
  }
  if (limit) {
    return await db.collection(table).find(match).limit(limit).toArray();
  }
  return await db.collection(table).find(match).toArray();
}

export async function findPage<Schema>(table: string, match: FilterQuery<Schema>, page: number, pageSize: number): Promise<Array<WithId<Schema>>> {
  if (!table || !match || !page || !pageSize) {
    return [];
  }
  const start = (page - 1) * pageSize;
  return await db.collection(table).find(match).skip(start).limit(pageSize).toArray();
}

export async function addIndex(table: string, indexes: string | any): Promise<void> {
  if (!table || !indexes) {
    return;
  }
  await db.collection(table).createIndex(indexes);
}
