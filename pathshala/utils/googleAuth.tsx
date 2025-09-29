import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import { useEffect } from "react";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { auth } from "../app/api/firebase/firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "YOUR_GOOGLE_CLIENT_ID", // Replace with your Google Client ID
    iosClientId: "YOUR_IOS_CLIENT_ID", // For iOS, if needed
    androidClientId: "YOUR_ANDROID_CLIENT_ID", // For Android, if needed
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return { promptAsync, request };
};

export const logout = () => {
  return signOut(auth);
};
