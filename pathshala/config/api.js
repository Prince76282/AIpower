import { Platform } from 'react-native';
import Constants from 'expo-constants';

const getApiUrl = () => {
  if (__DEV__) {
    // If running in Expo Go on a physical device, derive LAN IP from debuggerHost
    const debuggerHost = Constants?.expoConfig?.hostUri || Constants?.manifest2?.extra?.expoClient?.hostUri || Constants?.manifest?.debuggerHost;
    if (debuggerHost) {
      // debuggerHost example: "192.168.1.10:19000" or "127.0.0.1:19000"
      const host = debuggerHost.split(':')[0];
      if (host && host !== 'localhost' && host !== '127.0.0.1') {
        return `http://${host}:5000`;
      }
    }

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