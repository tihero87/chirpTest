import type { FC } from 'react';
import React from 'react';

import { Stack, Typography } from '@mui/material';

import { CharactersList } from '@/features';

import { ErrorBoundary } from '@/features/ErrorBoundary';

export const MainPage: FC = () => (
  <Stack p='32px'>
    <Typography>Chirp test app</Typography>

    <br />

    <ErrorBoundary>
      <CharactersList />
    </ErrorBoundary>
  </Stack>
);
