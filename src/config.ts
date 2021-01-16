import parseDbUrl from 'parse-database-url'
import dotenv from 'dotenv'

// Add .env values to running process
dotenv.config()

export namespace Database {
    export const schema = 'api'
    export const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/test'
    export const config = parseDbUrl(url)
    export const { database, user, name, username, password, hostname, host, port } = config
    export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0')
    export const poolMax = Number(process.env.DATABASE_POOL_MAX || '10')
    export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000')
}

export namespace Server {
    export const port = Number(process.env.PORT || '8000')
}

export namespace Knex {
    export const config = {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST_NAME || Database.host,
            database: process.env.DATABASE_NAME || Database.database,
            user: process.env.DATABASE_USERNAME || Database.user,
            password: process.env.DATABASE_PASSWORD || Database.password,
            port: process.env.DATABASER_PORT || Database.port,
        },
        pool: {
            min: process.env.DATABASE_POOL_MIN || Database.poolMin,
            max: process.env.DATABASE_POOL_MAX || Database.poolMax,
            idle: process.env.DATABASE_POOL_IDLE || Database.poolIdle,
        },
        migrations: {
            table_name: 'knex_migrations',
            directory: './database/migrations'
        },
        seeds: {
            directory: './database/seeds'
        }

    }
}