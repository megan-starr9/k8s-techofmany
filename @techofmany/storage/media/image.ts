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
  ImageRaw,
  Image,
} from '../types/Image';

const TABLE_NAME = 'media_images';

function transform(data: ImageRaw): Image {
  return {
    id: data._id.toString(),
    ...data,
  };
}

export async function createImages(data: Array<Creator<ImageRaw>>) {
  const images = await insert<ImageRaw>(TABLE_NAME, data);
  return images.map(transform);
}

export async function findImage(id: string) {
  const images = await findById<ImageRaw>(TABLE_NAME, id);
  return transform(images.shift());
}

export async function searchImages(criterion: Filter<ImageRaw>, page = null, limit = null) {
  const images = (page && limit)
    ? await findPage<ImageRaw>(TABLE_NAME, criterion, page, limit)
    : await find<ImageRaw>(TABLE_NAME, criterion);
  return images.map(transform);
}
