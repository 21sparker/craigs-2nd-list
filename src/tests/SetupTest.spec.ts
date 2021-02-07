import { knex } from '../api/app';

export default async () => {
    await knex.migrate.latest();
    await knex.seed.run();
}
