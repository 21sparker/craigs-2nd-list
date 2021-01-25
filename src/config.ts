// import parseDbUrl from 'parse-database-url'
import dotenv from 'dotenv'
import { Config } from 'knex'
import pg from 'pg';

// Fix ssl error on Heroku
pg.defaults.ssl = {
    rejectUnauthorized: false,
}

// Add .env values to running process
dotenv.config()

export const Database = {
    schema: 'api',
    // export const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/test'
    // export const config = parseDbUrl(url)
    // export const { database, user, name, username, password, hostname, host, port } = config
    database: process.env.DATABASE_NAME || 'test',
    host: process.env.DATABASE_HOST_NAME || 'localhost',
    user: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    port: Number(process.env.DATABASE_PORT || '5432'),
    poolMin: Number(process.env.DATABASE_POOL_MIN || '0'),
    poolMax: Number(process.env.DATABASE_POOL_MAX || '10'),
    poolIdle: Number(process.env.DATABASE_POOL_IDLE || '10000')
}

export const Server = {
    port: Number(process.env.PORT || '4000')
}

export const KnexConfig = {
    development: {
        client: 'postgresql',
        connection: {
            host: process.env.DATABASE_HOST_NAME || Database.host,
            database: process.env.DATABASE_NAME || Database.database,
            user: process.env.DATABASE_USERNAME || Database.user,
            password: process.env.DATABASE_PASSWORD || Database.password,
            port: Number(process.env.DATABASER_PORT || Database.port),
        },
        pool: {
            min: Number(process.env.DATABASE_POOL_MIN || Database.poolMin),
            max: Number(process.env.DATABASE_POOL_MAX || Database.poolMax),
            idleTimeoutMillis: Number(process.env.DATABASE_POOL_IDLE || Database.poolIdle),
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'migrations'
        },
        seeds: {
            directory: 'seeds'
        }
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        pool: {
            min: Number(process.env.DATABASE_POOL_MIN || Database.poolMin),
            max: Number(process.env.DATABASE_POOL_MAX || Database.poolMax),
            idleTimeoutMillis: Number(process.env.DATABASE_POOL_IDLE || Database.poolIdle),
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: 'migrations'
        },
        seeds: {
            directory: 'seeds'
        }
    }
}

export const BcryptConfig = {
    saltRounds: Number(process.env.SALT_ROUNDS || 10),
    privateKey: process.env.PRIVATE_KEY || 'some_private_key'
}


export default { Database, Server, KnexConfig }