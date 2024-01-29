import type { FC } from 'react';
import React from 'react';

import { CircularProgress, Stack } from '@mui/material';

export const PreloadScreen: FC = () => (
  <Stack alignItems='center' justifyContent='center'>
    <CircularProgress />
  </Stack>
);
