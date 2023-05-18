import {
  collection,
  getDocs,
  getFirestore as getFirestoreNative,
} from 'firebase/firestore';
import { getFirebaseApp } from './app';
import { TypingTheme } from '@/types/TypingData';

const getFirestore = () => getFirestoreNative(getFirebaseApp());

export const getPlatforms = async (): Promise<TypingTheme[]> => {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, 'platforms'));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TypingTheme[];
};
