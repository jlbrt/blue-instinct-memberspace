import path from 'path';
import { dbConnection } from '../src/db';

(async (): Promise<void> => {
  try {
    await dbConnection.migrate.rollback({
      directory: path.join(__dirname, '../migrations'),
    });

    console.log('rollback successful');
    process.exit(0);
  } catch (err) {
    console.error('migrations rollback failed', err);
    process.exit(1);
  }
})();
