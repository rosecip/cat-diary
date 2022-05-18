/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("diaryEntries", (table) => {
    table.bigIncrements("id");
    table.boolean("metCat").notNullable();
    table.boolean("ownCat").notNullable();
    table.string("date").notNullable();
    table.string("entry").notNullable();
    table.bigInteger("catId").notNullable().unsigned().index().references("cats.id");
    table.bigInteger("userId").notNullable().unsigned().index().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("diaryEntries");
};
