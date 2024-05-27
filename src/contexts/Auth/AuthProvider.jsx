import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { SignIn, ValidateToken } from '../../api/auth_api';
import { Navigate } from 'react-router-dom';

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token) {
      console.log('Token:', token);
      const validToken = validarToken();
      if (!validToken) {
        return Navigate('/login', { replace: true });
      }
    }
  }, []);

  const setAuthInfo = (token, user) => {
    localStorage.setItem('token', token);
    setUser(user);
    setToken(token);
  }

  const logar = async (email, password) => {
    const response = await SignIn(email, password);
    setAuthState(response);
    if (response.auth_token && response.user) {
      setAuthInfo(response.auth_token, response.user);
      return true;
    }
    setMessage(response.message);
    setError(response.error);

    return false;
  };

  const deslogar = () => {
    localStorage.removeItem('token');
    setUser({});
    setToken(null);
  };

  const validarToken = async () => {
    const response = await ValidateToken(token);
    if (response.user) {
      setUser(response.user);

      return true;
    } else {
      localStorage.removeItem('token');
      setUser({});
      setToken(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, logar, deslogar, validarToken, message }}>
      {children}
    </AuthContext.Provider>
  );
};
