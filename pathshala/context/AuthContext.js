// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Use your computer's IP address instead of localhost for mobile testing
const API_BASE_URL = 'http://192.168.1.11:5000/api'; // Replace with your actual IP

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing token on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = await AsyncStorage.getItem('userData');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        
        // Verify token with backend
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        } else {
          // Token is invalid, clear storage
          await clearAuthData();
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await clearAuthData();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await storeAuthData(data.token, data.user);
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await storeAuthData(data.token, data.user);
        setToken(data.token);
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Open Google OAuth URL
      const googleAuthUrl = `${API_BASE_URL}/auth/google`;
      // In a real app, you would use WebBrowser or similar to open this URL
      // For now, we'll return the URL for the user to open
      return { success: true, authUrl: googleAuthUrl };
    } catch (error) {
      console.error('Google login error:', error);
      return { success: false, error: 'Google login failed' };
    }
  };

  const handleGoogleCallback = async (token, userData) => {
    try {
      await storeAuthData(token, userData);
      setToken(token);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Google callback error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        // Call backend logout endpoint
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await clearAuthData();
      setToken(null);
      setUser(null);
    }
  };

  const storeAuthData = async (authToken, userData) => {
    await AsyncStorage.setItem('authToken', authToken);
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  };

  const clearAuthData = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userData');
  };

  const updateUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: 'Update failed' };
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    loginWithGoogle,
    handleGoogleCallback,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
