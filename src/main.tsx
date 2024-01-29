import { StrictMode, Suspense } from 'react';

import ReactDOM from 'react-dom/client';

import { App } from './App';
import { PreloadScreen } from './PreloadScreen';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<PreloadScreen />}>
      <App />
    </Suspense>
  </StrictMode>,
);
