import type { Result } from '@techofmany/storage/types';
import type { Collection } from './Collection';
import type { Playlist } from './Playlist';
import type { Video, Cast } from './Video';
import type { Image } from './Image';

type LibraryFields = {
  slug: string;
  name: string;
  category: string;
  collections: Array<Collection>;
  playlists?: Array<Playlist>;
  videos?: Array<Video>;
  images?: Array<Image>;
  cast?: Cast;
};

export type LibraryRaw = Result<LibraryFields>;
export type Library = Result<LibraryFields> & {
  id: string,
};
