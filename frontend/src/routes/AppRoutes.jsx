import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
// import MyFoods from '../pages/MyFoods/MyFoods';
import BasicLayout from '../layouts/BasicLayout';
import AuthLayout from '../layouts/AuthLayout';
import { AuthContext } from '../Contexts/AuthContext';
import { ROUTES } from './consts';

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const routes = [
    {
      path: ROUTES.LOGIN,
      Component: Login,
      Layout: AuthLayout,
    },
    {
      path: ROUTES.REGISTER,
      Component: Register,
      Layout: AuthLayout,
    },
    {
      path: ROUTES.HOME,
      Component: Home,
      Layout: BasicLayout,
      isProtected: true,
    },
    // {
    //   path: ROUTES.MY_FOODS,
    //   Component: MyFoods,
    //   Layout: BasicLayout,
    //   isProtected: true,
    // },
  ];

  return (
    <Routes>
      {routes.map(({ path, Component, Layout, isProtected }) => (
        <Route
          key={path}
          path={path}
          element={
            isProtected && !isLoggedIn ? (
              <Navigate to="/login" replace />
            ) : (
              <Layout>
                <Component />
              </Layout>
            )
          }
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
