import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';
import Home from '@Pages/Home';
import Login from '@Pages/Login';
import Profile from '@Pages/Profile';
import Trip from '@Pages/Trip';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'trips/:tripId', element: <Trip /> },
      { path: 'profile/me', element: <Profile /> },
      { path: '', element: <Navigate to="/home" replace /> },
      { path: '*', element: <Navigate to="/home" replace /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  { path: '', element: <Navigate to="/home" replace /> },
  { path: '*', element: <Navigate to="/home" replace /> },
]);

const root = ReactDOM.createRoot(
  document.querySelector('#root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
