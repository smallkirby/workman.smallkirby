import { AuthContextState, FirebaseUser } from '@/types/FirebaseUser';
import { getFirebaseApp } from './app';
import { getAuth } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';

const FirebaseAuthContext = createContext<AuthContextState>({
  user: undefined,
});

type Props = {
  children: React.ReactNode;
};

const FirebaseAuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseUser | null | undefined>(undefined);

  const app = getFirebaseApp();
  const auth = getFirebaseAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          photoUrl: user.photoURL,
          providerId: user.providerId,
        });
      }
    });
    return () => unsubscribe();
  }, [app, auth]);

  return (
    <FirebaseAuthContext.Provider value={{ user }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const getFirebaseAuth = () => getAuth(getFirebaseApp());

export { FirebaseAuthContext, FirebaseAuthProvider };
