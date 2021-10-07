import type { Result } from '@techofmany/storage/types';
import type { Cast } from './Video';

type PlaylistFields = {
  library_id?: string;
  collection_id?: string;
  title: string;
  order: string;
  cast?: Cast;
};

export type PlaylistRaw = Result<PlaylistFields>;
export type Playlist = Result<PlaylistFields> & {
  id: string,
};
