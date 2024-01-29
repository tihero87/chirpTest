import type { ErrorInfo, ReactNode } from 'react';
import React, { Component } from 'react';

import { Stack, Typography } from '@mui/material';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Stack alignItems='center' justifyContent='center' width='100%' pt='32px'>
          <Typography>Something went wrong.</Typography>
        </Stack>
      );
    }

    return children;
  }
}
