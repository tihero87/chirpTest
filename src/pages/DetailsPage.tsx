import type { FC } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton, Stack } from '@mui/material';

import { ErrorBoundary } from '@/features';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { CharacterItem } from '@/features/CharacterItem';

export const DetailsPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack alignItems='flex-start' justifyContent='flex-start' p='32px' sx={{ width: '100%', position: 'relative' }}>
      <IconButton sx={{ position: 'absolute', left: 1, top: 1 }} onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>

      <br />

      <ErrorBoundary>
        <CharacterItem />
      </ErrorBoundary>
    </Stack>
  );
};
