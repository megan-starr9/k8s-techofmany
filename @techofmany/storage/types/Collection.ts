import type { Result } from '@techofmany/storage/types';
import type { Playlist } from './Playlist';
import type { Video, Cast } from './Video';
import type { Image } from './Image';

type CollectionFields = {
  library_id: string;
  collection_id?: string;
  name: string;
  type: string;
  order: number;
  sub_collections?: Array<Collection>;
  playlists?: Array<Playlist>;
  videos?: Array<Video>;
  images?: Array<Image>;
  cast?: Cast;
};

export type CollectionRaw = Result<CollectionFields>;
export type Collection = Result<CollectionFields> & {
  id: string,
};
