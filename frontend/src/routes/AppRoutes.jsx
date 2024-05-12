import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';
import MyFoods from '../pages/MyFoods/MyFoods';
import BasicLayout from '../layouts/BasicLayout';
import AuthLayout from '../layouts/AuthLayout';
import { AuthContext } from '../contexts/AuthContext';
import CreateFoodForm from '../components/CreateFoodItem/CreateFoodItem';

const AppRoutes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthLayout>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <Register />
          </AuthLayout>
        }
      />
      <Route
        path="/home"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <Home />
            </BasicLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/my-foods"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <MyFoods />
            </BasicLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/create-food"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <CreateFoodForm />
            </BasicLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
