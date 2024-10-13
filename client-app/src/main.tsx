// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { store, StoreContext } from './app/stores/store.ts';
import { router } from './app/router/Routes.tsx';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';

createRoot(document.getElementById('root')!).render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);
