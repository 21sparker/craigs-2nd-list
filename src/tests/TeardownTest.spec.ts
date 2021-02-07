import { knex } from '../api/app';

export default async () => {
    await knex.migrate.rollback(undefined, true);
}
