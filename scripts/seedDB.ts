import path from 'path';
import { dbConnection } from '../src/db';

(async (): Promise<void> => {
  try {
    await dbConnection.seed.run({
      directory: path.join(__dirname, '../seeds'),
    });

    console.log('database seeding successful');
    process.exit(0);
  } catch (err) {
    console.error('database seeding failed', err);
    process.exit(1);
  }
})();
