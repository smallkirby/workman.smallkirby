import MigrationService from '../lib/migration-service';

/**
 * Set ID for each histories.
 */
const main = async () => {
  const service = new MigrationService();

  const histories = await service.db.collection('histories').get();
  await Promise.all(
    histories.docs.map(async (doc) => {
      const history = doc.data();
      const id = doc.id;
      const newHistory = {
        ...history,
        id: id,
      };
      await service.db.collection('histories').doc(doc.id).set(newHistory);
    })
  );
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
