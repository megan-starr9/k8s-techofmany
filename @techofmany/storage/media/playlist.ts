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
  PlaylistRaw,
  Playlist,
} from '../types/Playlist';

const TABLE_NAME = 'media_playlists';

function transform(data: PlaylistRaw): Playlist {
  return {
    id: data._id.toString(),
    ...data,
  };
}

export async function createPlaylists(data: Array<Creator<PlaylistRaw>>) {
  const playlists = await insert<PlaylistRaw>(TABLE_NAME, data);
  return playlists.map(transform);
}

export async function findPlaylist(id: string) {
  const playlists = await findById<PlaylistRaw>(TABLE_NAME, id);
  return transform(playlists.shift());
}

export async function searchPlaylists(criterion: Filter<PlaylistRaw>, page = null, limit = null) {
  const playlists = (page && limit)
    ? await findPage<PlaylistRaw>(TABLE_NAME, criterion, page, limit)
    : await find<PlaylistRaw>(TABLE_NAME, criterion);
  return playlists.map(transform);
}
