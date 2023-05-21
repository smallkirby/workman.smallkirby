# Migrations for Firestore

```bash
npm ci
./scripts/init-migration

gcloud auth login
gcloud config set project workman-89f8e

# copy secret key of Firebase Admin SDK to root of this project as `firebase.cert.json` beforehand
npx ts-node ./migrations/<script>.migration.ts
```
