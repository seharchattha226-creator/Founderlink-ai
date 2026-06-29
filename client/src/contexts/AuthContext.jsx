/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [pendingUserEmail, setPendingUserEmail] = useState(null); // Store email for OTP

  // Logout user
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully!');
  }, []);

  // Load user from API
  const loadUser = useCallback(async () => {
    try {
      const data = await authAPI.getMe();
      setUser(data.data);
    } catch (error) {
      console.error('Load user error:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Set token in axios defaults
  useEffect(() => {
    if (token) {
      // Defer execution to avoid synchronous render warning in effect
      const timer = setTimeout(() => {
        loadUser();
      }, 0);
      return () => clearTimeout(timer);
    } else {
      // Defer state update to avoid synchronous render warning in effect
      const timer = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(timer);
    }
  }, [token, loadUser]);

  // Register user
  const register = async (name, email, password, role) => {
    try {
      const data = await authAPI.register(name, email, password, role);
      console.log('Register success! Data:', data);
      
      // Store email for OTP verification
      setPendingUserEmail(email);
      toast.success('OTP sent to your email! 📧');
    } catch (error) {
      console.error('Registration error:', error);
      
      // Extract error message from backend response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          error.response?.data?.errors?.[0]?.msg ||
                          'Something went wrong!';
      toast.error(errorMessage);
      throw new Error(errorMessage, { cause: error });
    }
  };

  // Verify OTP
  const verifyOTP = async (otp) => {
    try {
      const data = await authAPI.verifyOTP(pendingUserEmail, otp);
      console.log('OTP verified! Data:', data);
      
      // Save token and user info
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      setPendingUserEmail(null);
      toast.success('Email verified! Welcome to FounderLink AI! 🎉');
    } catch (error) {
      console.error('OTP verification error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          'Something went wrong!';
      toast.error(errorMessage);
      throw new Error(errorMessage, { cause: error });
    }
  };

  // Resend OTP
  const resendOTP = async () => {
    try {
      await authAPI.resendOTP(pendingUserEmail);
      toast.success('OTP resent! 📧');
    } catch (error) {
      console.error('Resend OTP error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          'Something went wrong!';
      toast.error(errorMessage);
      throw new Error(errorMessage, { cause: error });
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const data = await authAPI.login(email, password);
      console.log('Login success! Data:', data);
      
      // Save token and user info
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Welcome back! 👋');
    } catch (error) {
      console.error('Login error:', error);
      
      // Extract error message from backend response
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Something went wrong!';
      toast.error(errorMessage);
      throw new Error(errorMessage, { cause: error });
    }
  };

  // Social login
  const loginWithGoogle = async () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
    const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || 'http://localhost:5173';
    
    console.log('Google Client ID:', GOOGLE_CLIENT_ID);
    console.log('Redirect URI:', REDIRECT_URI);
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'online',
      prompt: 'select_account consent',
    });
    
    console.log('Full Auth URL:', authUrl);
    window.location.href = authUrl;
  };

  const loginWithGithub = async () => {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID || 'your-github-client-id';
    const REDIRECT_URI = import.meta.env.VITE_GITHUB_REDIRECT_URI || 'http://localhost:5173';
    
    const authUrl = `https://github.com/login/oauth/authorize?` + new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: 'user:email',
    });
    
    window.location.href = authUrl;
  };

  // Handle OAuth callback (called from App.jsx)
  const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      toast.error('Authentication cancelled or failed');
      return;
    }

    if (!code) return;

    // Clear the URL
    window.history.replaceState({}, document.title, window.location.pathname);

    try {
      // Try Google first
      let data;
      try {
        data = await authAPI.google(code);
      } catch (err) {
        // Try GitHub if Google fails
        data = await authAPI.github(code);
      }

      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success('Welcome!');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           'Authentication failed';
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        login,
        logout,
        pendingUserEmail,
        verifyOTP,
        resendOTP,
        loginWithGoogle,
        loginWithGithub,
        handleOAuthCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
