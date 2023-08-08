/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('film').del()
  await knex('film').insert([
    {id: 1, filmname: 'Tosun Paşa'},
    {id: 2, filmname: 'Banker Bilo'},
    {id: 3, filmname: 'Tatar Ramazan'}
  ]);
};
