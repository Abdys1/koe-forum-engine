import argon2 from 'argon2';

/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-empty-function
export async function seed(knex) {
  const hash = await argon2.hash('alma');
  return knex('forum_user')
    .insert({
      username: 'admin',
      password: hash,
    });
}
