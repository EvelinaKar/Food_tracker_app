import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { ROUTES } from '../routes/consts';
import { checkUser } from '../api/auth';

export const AuthContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const authenticatedUser = await checkUser();
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Error checking user authentication', error);
        handleLogout();
      }
    };

    verifyUser();
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('authToken', token);
    setUser(userData);
    navigate(ROUTES.HOME);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate(ROUTES.LOGIN);
  };

  return <AuthContext.Provider value={{ user, isLoggedIn: !!user, handleLogin, handleLogout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
