import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';

import type { Character } from '@/entities';
import type { UseCharactersResult } from '@/hooks';
import { useCharacters } from '@/hooks';

import { useDebounceState } from '@/hooks/useDebouncedState';
import { useReplaceWithDataFromCache } from '@/hooks/useReplaceWithDataFromCache';

export const CharactersList: FC = () => {
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState<string>('');
  const debouncedSearch = useDebounceState(searchString);
  const { data, fetchNextPage, hasNextPage, isFetching } = useCharacters(debouncedSearch);
  const freshData = useReplaceWithDataFromCache(data);

  const characters = (freshData || { pages: [] }) as UseCharactersResult;

  const { ref, inView } = useInView();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  const handleCardClick = (url: string) => {
    const itemId = url.split('/').filter(Boolean).pop();
    navigate(`/character/${itemId}`);
  };

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      void fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      <TextField
        fullWidth
        label='Search Characters'
        variant='outlined'
        value={searchString}
        style={{ marginBottom: '20px' }}
        onChange={handleSearchChange}
      />

      <Grid container spacing={2} data-automation-id='character-list'>
        {characters?.pages?.[0]?.data?.count > 0 ? (
          characters.pages.map(group =>
            group.data.results.map((character: Character) => (
              <Grid key={character.url} item xs={12} sm={6} md={4}>
                <Card
                  data-automation-id='character-card'
                  sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                  onClick={() => handleCardClick(character.url)}
                >
                  <CardContent>
                    <Typography variant='h5'>{character.name}</Typography>

                    <Typography>Height: {character.height}</Typography>

                    <Typography>Mass: {character.mass}</Typography>

                    <Typography>Hair Color: {character.hair_color}</Typography>

                    <Typography>Skin Color: {character.skin_color}</Typography>

                    <Typography>Eye Color: {character.eye_color}</Typography>

                    <Typography>Birth Year: {character.birth_year}</Typography>

                    <Typography>Gender: {character.gender}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            )),
          )
        ) : isFetching ? null : (
          <Stack alignItems='center' justifyContent='center' width='100%' pt='32px'>
            {searchString ? (
              <Typography>Search result is empty</Typography>
            ) : (
              <Typography>Nothing more to load</Typography>
            )}
          </Stack>
        )}

        {hasNextPage ? (
          <Stack ref={ref} alignItems='center' justifyContent='center' width='100%' height='100px' />
        ) : null}

        {isFetching ? (
          <Stack alignItems='center' justifyContent='center' width='100%' height='100px'>
            <CircularProgress />
          </Stack>
        ) : null}
      </Grid>
    </>
  );
};
