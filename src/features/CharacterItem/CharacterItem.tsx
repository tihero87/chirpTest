import type { FC } from 'react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, CardContent, CircularProgress, Grid, IconButton, Stack, TextField, Typography } from '@mui/material';

import type { Character } from '@/entities';
import { useCharacter } from '@/hooks';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { useCharacterSave } from '@/hooks/useCharacterSave';

export const CharacterItem: FC = () => {
  const { itemId } = useParams();
  const { data, isFetching } = useCharacter(itemId);
  const character: Character | undefined = data?.data || undefined;
  const [tempCharacter, setTempCharacter] = useState<Character | undefined>();
  const { updateCharacter, updateCharacterList } = useCharacterSave();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempCharacter(prev => ({ ...prev!, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (!tempCharacter) {
      console.error('unable to save character');

      return;
    }

    updateCharacter(tempCharacter);
    updateCharacterList(tempCharacter);
    setTempCharacter(undefined);
  };

  if (isFetching) {
    return (
      <Stack alignItems='center' justifyContent='center' width='100%'>
        <CircularProgress />
      </Stack>
    );
  }

  if (!character) {
    return (
      <Stack alignItems='center' justifyContent='center' width='100%'>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Card data-automation-id='character-item' sx={{ minWidth: '300px', position: 'relative' }}>
      <CardContent>
        {character ? (
          <>
            <Stack alignItems='center' justifyContent='center'>
              {!tempCharacter ? (
                <IconButton sx={{ position: 'absolute', right: 1, top: 1 }} onClick={() => setTempCharacter(character)}>
                  <EditIcon />
                </IconButton>
              ) : (
                <IconButton sx={{ position: 'absolute', right: 1, top: 1 }} onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
              )}
            </Stack>

            {tempCharacter ? (
              <Stack p='32px'>
                <TextField label='Name' name='name' value={tempCharacter?.name} onChange={handleChange} />
              </Stack>
            ) : (
              <>
                <Typography gutterBottom variant='h5'>
                  {character.name}
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>Height: {character.height}</Typography>

                    <Typography>Mass: {character.mass}</Typography>

                    <Typography>Hair Color: {character.hair_color}</Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography>Skin Color: {character.skin_color}</Typography>

                    <Typography>Eye Color: {character.eye_color}</Typography>

                    <Typography>Birth Year: {character.birth_year}</Typography>

                    <Typography>Gender: {character.gender}</Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </>
        ) : (
          <Stack alignItems='center' justifyContent='center' width='100%'>
            {isFetching ? <CircularProgress /> : <Typography>No character</Typography>}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
