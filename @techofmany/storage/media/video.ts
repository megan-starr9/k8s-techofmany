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
  VideoRaw,
  Video,
} from '../types/Video';

const TABLE_NAME = 'media_videos';

function transform(data: VideoRaw): Video {
  return {
    id: data._id.toString(),
    ...data,
  };
}

export async function createVideos(data: Array<Creator<VideoRaw>>) {
  const videos = await insert<VideoRaw>(TABLE_NAME, data);
  return videos.map(transform);
}

export async function findVideo(id: string) {
  const videos = await findById<VideoRaw>(TABLE_NAME, id);
  return transform(videos.shift());
}

export async function searchVideos(criterion: Filter<VideoRaw>, page = null, limit = null) {
  const videos = (page && limit)
    ? await findPage<VideoRaw>(TABLE_NAME, criterion, page, limit)
    : await find<VideoRaw>(TABLE_NAME, criterion);
  return videos.map(transform);
}
