import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore as getFirestoreNative,
  setDoc,
} from 'firebase/firestore';
import { getFirebaseApp } from './app';
import { TypingData, TypingTheme } from '@/types/TypingData';
import { FirebaseError } from 'firebase/app';
import { stripIndent } from 'common-tags';

const getFirestore = () => getFirestoreNative(getFirebaseApp());

const convertTypingData2Firebase = (data: TypingData) => {
  return {
    ...data,
    date: Timestamp.fromDate(data.date),
  };
};

export class PrettyFirebaseError extends Error {
  readonly code: string;
  readonly message: string;

  constructor(error: FirebaseError) {
    super(error.message);

    switch (error.code) {
      case 'permission-denied':
        this.code = 'permission-denied';
        this.message = stripIndent`
            Permission denied.
            You have to be logged in as smallkirby.
            Are you cheating...!?!?`;
        break;
      default:
        this.code = 'unknown';
        this.message = error.message;
        break;
    }
  }
}

export const getPlatforms = async (): Promise<
  TypingTheme[] | PrettyFirebaseError
> => {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, 'platforms'))
    .then((s) => s)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });
  if (snapshot instanceof PrettyFirebaseError) {
    return snapshot;
  }

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as TypingTheme[];
};

export const getHistories = async (): Promise<
  TypingData[] | PrettyFirebaseError
> => {
  const db = getFirestore();
  const snapshot = await getDocs(collection(db, 'histories'))
    .then((s) => s)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });
  if (snapshot instanceof PrettyFirebaseError) {
    return snapshot;
  }

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
  })) as TypingData[];
};

export const createHistory = async (
  history: TypingData
): Promise<void | PrettyFirebaseError> => {
  const db = getFirestore();
  const historiesCollection = collection(db, 'histories');
  const docRef = doc(historiesCollection);
  const result = await setDoc(docRef, {
    ...convertTypingData2Firebase(history),
    id: docRef.id,
  })
    .then((doc) => doc)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });
  if (result instanceof PrettyFirebaseError) {
    return result;
  }
};

export const deleteHistory = async (
  history: TypingData
): Promise<void | PrettyFirebaseError> => {
  if (!history.id) {
    return;
  }
  const db = getFirestore();
  const result = await deleteDoc(doc(db, 'histories', history.id))
    .then((doc) => doc)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });

  if (result instanceof PrettyFirebaseError) {
    return result;
  }
};

export const updateHistory = async (
  history: TypingData
): Promise<void | PrettyFirebaseError> => {
  if (!history.id) {
    return;
  }
  const db = getFirestore();
  const result = await setDoc(
    doc(db, 'histories', history.id),
    convertTypingData2Firebase(history)
  )
    .then((doc) => doc)
    .catch((e) => {
      if (e instanceof FirebaseError) {
        return new PrettyFirebaseError(e);
      } else {
        console.error(e);
        throw e;
      }
    });

  if (result instanceof PrettyFirebaseError) {
    return result;
  }
};
