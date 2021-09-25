import type {
   WithId,
   WithoutId,
   Filter as MongoFilter,
 } from 'mongodb';

export type Result<T> = WithId<T>;
export type Creator<T> = WithoutId<T>;
export type Filter<T> = MongoFilter<T>;
