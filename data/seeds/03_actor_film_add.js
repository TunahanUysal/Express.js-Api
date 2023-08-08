/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('actor_film').del()
  await knex('actor_film').insert([
    {film_id: 1, actor_id: 1},
    {film_id: 2, actor_id: 2},
    {film_id: 3, actor_id: 3}
  ]);
};
