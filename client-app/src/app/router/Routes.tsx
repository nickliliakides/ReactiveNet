import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import EventForm from '../../features/events/form/EventForm';
import EventDetails from '../../features/events/details/EventDetails';
import TestErrors from '../../features/errors/TestErrors';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'events',
        element: <EventDashboard />,
      },
      {
        path: 'events/:id',
        element: <EventDetails />,
      },
      {
        path: 'events/create',
        element: <EventForm key='create' />,
      },
      {
        path: 'events/edit/:id',
        element: <EventForm key='edit' />,
      },
      {
        path: 'errors',
        element: <TestErrors />,
      },
      {
        path: 'not-found',
        element: <NotFound />,
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: '*',
        element: <Navigate replace to='/not-found' />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
