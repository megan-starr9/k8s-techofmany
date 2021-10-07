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
  LibraryRaw,
  Library,
} from '../../types/Library';

const TABLE_NAME = 'media_libraries';

function transform(data: LibraryRaw): Library {
  return {
    id: data._id.toString(),
    ...data,
  };
}

export async function createLibrary(data: Creator<LibraryRaw>) {
  const libraries = await insert<LibraryRaw>(TABLE_NAME, data);
  return transform(libraries.shift());
}

export async function findLibrary(slug: string) {
  const libraries = await find<LibraryRaw>(TABLE_NAME, { slug });
  return transform(libraries.shift());
}

export async function searchLibraries(criterion: Filter<LibraryRaw>, page = null, limit = null) {
  const libraries = (page && limit)
    ? await findPage<LibraryRaw>(TABLE_NAME, criterion, page, limit)
    : await find<LibraryRaw>(TABLE_NAME, criterion);
  return libraries.map(transform);
}
