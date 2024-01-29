import type { Character } from '@/entities';
import { useQueryClient } from '@tanstack/react-query';

import { type UseCharactersResult, getCharactersQueryKey } from '@/hooks/useCharacters';

export interface CachePersons {
  [key: string]: Character;
}
export const useReplaceWithDataFromCache = (data: UseCharactersResult | undefined) => {
  const queryClient = useQueryClient();
  const charactersQueryKey = getCharactersQueryKey('');
  const charactersFromCache = queryClient.getQueryData<UseCharactersResult | undefined>(charactersQueryKey);
  const cachePerson: CachePersons = {};

  charactersFromCache?.pages?.forEach(page => {
    page?.data?.results.forEach(person => {
      cachePerson[person.url] = person;
    });
  });

  const freshData = { ...data };

  if (Object.keys(cachePerson).length) {
    freshData?.pages?.forEach(page => {
      page?.data?.results?.forEach(person => {
        Object.assign(person, cachePerson[person.url]);
      });
    });
  }

  return freshData;
};
