import Knex from 'knex';

export const up = async (dbConnection: Knex) => {
  await dbConnection.schema.createTable('sessions', (table) => {
    table
      .uuid('id')
      .notNullable()
      .unique()
      .primary()
      .defaultTo(dbConnection.raw('uuid_generate_v4()'));

    table.string('sessionId').notNullable().unique().index();

    table.uuid('userId').notNullable();
    table
      .foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamp('createdAt').notNullable().defaultTo(dbConnection.fn.now());
  });
};

export const down = () => {};
