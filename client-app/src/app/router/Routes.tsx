import React from 'react';

import { createBrowserRouter, RouteObject } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/events/dashboard/EventDashboard';
import EventForm from '../../features/events/form/EventForm';
import EventDetails from '../../features/events/details/EventDetails';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
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
    ],
  },
];

export const router = createBrowserRouter(routes);
