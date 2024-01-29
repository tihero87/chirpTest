import type { ErrorResponse } from '@/api/characters';
import { getCharacter } from '@/api/characters';
import type { Character } from '@/entities';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export const getCharacterQueryKey = (characterId: string) => ['characters', characterId];

export const useCharacter = (characterId?: string): UseQueryResult<AxiosResponse<Character, ErrorResponse>, unknown> =>
  useQuery(getCharacterQueryKey(characterId || ''), () => getCharacter({ characterId: characterId || '' }), {
    enabled: !!characterId,
  });
