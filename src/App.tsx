import type { FC } from 'react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { router } from './routes';

const queryCache = new QueryCache();

const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: 3600000,
      networkMode: 'offlineFirst',
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      useErrorBoundary: true,
    },
  },
});

export const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
