import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

export default class MigrationService {
  readonly app: admin.app.App;
  readonly db: admin.firestore.Firestore;

  constructor() {
    const cert = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, '../../../firebase.cert.json'),
        'utf-8',
      ),
    );
    this.app = admin.initializeApp({
      credential: admin.credential.cert(cert),
    });
    this.db = this.app.firestore();
  }

  async migrate() {}
}
