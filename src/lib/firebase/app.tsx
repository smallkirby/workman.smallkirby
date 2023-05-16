import { FirebaseOptions, getApps, initializeApp } from 'firebase/app';

if (process.env.NEXT_PUBLIC_FIREBASE_APIKEY === undefined) {
  throw new Error('NEXT_PUBLIC_FIREBASE_APIKEY is undefined');
}

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: 'workman-89f8e.firebaseapp.com',
  projectId: 'workman-89f8e',
  appId: '1:844123798955:web:728b9d96d8db1240f2a6ee',
};

const app = initializeApp(firebaseConfig);

export const getFirebaseApp = () => {
  return getApps().length ? getApps()[0] : app;
};
