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
  CollectionRaw,
  Collection,
} from '../../types/Collection';

const TABLE_NAME = 'media_collections';

function transform(data: CollectionRaw): Collection {
  return {
    id: data._id.toString(),
    ...data,
  };
}

export async function createCollection(data: Creator<CollectionRaw>) {
  const collections = await insert<CollectionRaw>(TABLE_NAME, data);
  return transform(collections.shift());
}

export async function findCollection(id: string) {
  const collections = await findById<CollectionRaw>(TABLE_NAME, id);
  return transform(collections.shift());
}

export async function searchCollections(criterion: Filter<CollectionRaw>, page = null, limit = null) {
  const collections = (page && limit)
    ? await findPage<CollectionRaw>(TABLE_NAME, criterion, page, limit)
    : await find<CollectionRaw>(TABLE_NAME, criterion);
  return collections.map(transform);
}
