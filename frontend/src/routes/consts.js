import Login from '../pages/Login/Login';
import BasicLayout from '../layouts/BasicLayout';
import AuthLayout from '../layouts/AuthLayout';

export const ROUTES = {
  LOGIN: '/login',
};

export const routes = [
  {
    path: ROUTES.LOGIN,
    Component: Login,
    Layout: AuthLayout,
  },
];

export const navigationBarLinks = [{}];
