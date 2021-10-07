import type { Library } from '../types/Library';

export function findLibrary(slug: string): Promise<Library> {
  return Promise.resolve({
    slug,
    name: 'Test Library',
    category: 'show',
    collections: [],
  } as Library);
}
