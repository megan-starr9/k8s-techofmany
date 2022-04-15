import type { Result } from '@techofmany/storage/types';

type ImageFields = {
  library_id?: string;
  collection_id?: string;
  title: string;
  order: string;
  description: string;
  credit: string;
  source: string;
};

export type ImageRaw = Result<ImageFields>;
export type Image = Result<ImageFields> & {
  id: string,
};
