import Knex from 'knex';

export const up = async (dbConnection: Knex) => {
  await dbConnection.schema.createTable('users', (table) => {
    table
      .uuid('id')
      .notNullable()
      .unique()
      .primary()
      .defaultTo(dbConnection.raw('uuid_generate_v4()'));

    table.string('steamId64').notNullable().unique();
  });
};

export const down = () => {};
