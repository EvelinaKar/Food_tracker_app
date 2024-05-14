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
import MyMeals from '../pages/MyMeals/MyMeals';
import MealForm from '../components/MealForm/MealForm';
import ViewMealCard from '../components/ViewMeal/ViewMealCard';

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
      <Route
        path="/my-meals"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <MyMeals />
            </BasicLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/create-meal"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <MealForm mode="create" />
            </BasicLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/meal/:id"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <ViewMealCard />
            </BasicLayout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/update-meal/:id"
        element={
          isLoggedIn ? (
            <BasicLayout>
              <MealForm mode="edit" />
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
