import argon2 from 'argon2';
import { Knex } from 'knex';

async function seed(knex: Knex) {
  const hash = await argon2.hash('alma');
  return knex('forum_user')
    .insert({
      username: 'admin',
      password: hash,
    });
}

export { seed };
