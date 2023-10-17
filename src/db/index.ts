import knex, { Knex } from 'knex';
import config from 'db/knexfile';

//TODO NODE ENV alapján configoljuk
export default knex(config.development as Knex.Config);
