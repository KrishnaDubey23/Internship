import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          // Verify user still exists in backend
          try {
            const currentUser = await apiService.getUser(userData.user_id);
            setUser({ ...userData, ...currentUser });
          } catch (error) {
            // User no longer exists, clear local storage
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.login(email);
      
      // The backend already returns the full user object
      // Just need to rename _id to user_id for consistency
      const userInfo = {
        user_id: response._id,
        ...response
      };
      
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      return userInfo;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Registering user with data:', userData);
      const response = await apiService.register(userData);
      console.log('Registration response:', response);
      
      // Get the created user data
      const newUser = await apiService.getUser(response.user_id);
      console.log('User data retrieved:', newUser);
      
      const userInfo = {
        user_id: response.user_id,
        ...newUser
      };
      
      setUser(userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      return userInfo;
    } catch (error) {
      console.error('Registration error details:', error);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      await apiService.updateUser(user.user_id, userData);
      
      // Update local user state
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    updateProfile,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
