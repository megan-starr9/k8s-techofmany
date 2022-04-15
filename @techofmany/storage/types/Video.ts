import type { Result } from '@techofmany/storage/types';

export type Cast = Array<{
  order: string,
  name: string,
  role: string,
}>;

type VideoFields = {
  library_id?: string;
  collection_id?: string;
  title: string;
  order: string;
  description: string;
  source: string;
  cast?: Cast;
};

export type VideoRaw = Result<VideoFields>;
export type Video = Result<VideoFields> & {
  id: string,
};
