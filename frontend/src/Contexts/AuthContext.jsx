import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { ROUTES } from '../routes/consts';
import { checkUser } from '../api/auth';

export const AuthContext = createContext({
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (userData, token) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    navigate(ROUTES.MY_MEAL_PLANS);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.log('No token found, skipping profile fetch');
        handleLogout();
        return;
      }

      try {
        const userData = await checkUser();
        if (userData) {
          setIsLoggedIn(true);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Error checking user authentication:', error);
        handleLogout();
      }
    };

    verifyUser();
  }, []);

  return <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
