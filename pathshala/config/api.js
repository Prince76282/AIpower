import { Platform } from 'react-native';

const getApiUrl = () => {
  if (__DEV__) {
    // Android emulator needs special IP
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:5000';
    }
    // iOS simulator and web can use localhost
    return 'http://localhost:5000';
  }
  // Production URL
  return 'https://your-production-url.com';
};

export const API_URL = getApiUrl();