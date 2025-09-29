import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAglqm1RTjaHg2v2KfCcP5Ss_Zvzt3drtg",
  authDomain: "aipowerapp.firebaseapp.com",
  projectId: "aipowerapp",
  storageBucket: "aipowerapp.firebasestorage.app",
  messagingSenderId: "85059822707",
  appId: "1:85059822707:web:6a8f68c5c88d96496d7606",
};

const app = initializeApp(firebaseConfig);

export default app;