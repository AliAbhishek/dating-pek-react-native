// ** React Imports
import React, {createContext, useEffect, useState} from 'react';

// ** Third Party Imports
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const isCreated = await AsyncStorage.getItem('isProfileCreated');

      // MARK: Is logged in?
      if (token) {
        setIsAuthenticated(true);
        setToken(token);
      } else {
        setIsAuthenticated(false);
      }
      // MARK: Is profile created?
      if (isCreated == 'true') {
        setIsProfileCreated(true);
      }
    } catch (error) {
      console.error('Failed to fetch token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
    // handleLogOut();
  }, []);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.clear();
      await checkToken();
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        token,
        checkToken,
        handleLogOut,
        isProfileCreated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
