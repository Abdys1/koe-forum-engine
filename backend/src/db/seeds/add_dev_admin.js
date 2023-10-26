import argon2 from 'argon2';

/* eslint-disable import/prefer-default-export */
async function seed(knex) {
  const hash = await argon2.hash('alma');
  return knex('forum_user')
    .insert({
      username: 'admin',
      password: hash,
    });
}

export { seed };
