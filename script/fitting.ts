import { applicationDefault, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fitCurve from 'fit-curve';
import { TypingData } from '../src/types/TypingData';

if (process.env.GOOGLE_APPLICATION_CREDENTIALS === undefined) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS is undefined');
}

const app = initializeApp({
  credential: applicationDefault(),
});
const db = getFirestore(app);

const getHistories = async () => {
  const snapshot = await db.collection('histories').get();
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    date: doc.data().date.toDate(),
  })) as TypingData[];
};

const main = async () => {
  const histories = (await getHistories()).sort(
    (a, b) => a.date.getTime() - b.date.getTime(),
  );
  const initialTime = histories[0].date.getTime();
  const points = histories.map((history) => [
    history.date.getTime() - initialTime,
    history.wpm,
  ]);
  const curve = fitCurve(points, 50);
  console.log(curve);
};

main();
