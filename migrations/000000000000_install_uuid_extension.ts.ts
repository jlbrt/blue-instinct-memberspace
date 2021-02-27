import Knex from 'knex';

export const up = async (dbConnection: Knex) => {
  await dbConnection.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

export const down = () => {};
