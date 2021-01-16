// import parseDbUrl from 'parse-database-url'
import dotenv from 'dotenv'
import { Config } from 'knex'

// Add .env values to running process
dotenv.config()

export namespace Database {
    export const schema = 'api'
    // export const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/test'
    // export const config = parseDbUrl(url)
    // export const { database, user, name, username, password, hostname, host, port } = config
    export const database = process.env.DATABASE_NAME || 'test'
    export const host = process.env.DATABASE_HOST_NAME || 'localhost'
    export const user = process.env.DATABASE_USERNAME || 'postgres'
    export const password = process.env.DATABASE_PASSWORD || 'postgres'
    export const port = Number(process.env.DATABASE_PORT || '5432')
    export const poolMin = Number(process.env.DATABASE_POOL_MIN || '0')
    export const poolMax = Number(process.env.DATABASE_POOL_MAX || '10')
    export const poolIdle = Number(process.env.DATABASE_POOL_IDLE || '10000')
}

export namespace Server {
    export const port = Number(process.env.PORT || '4000')
}

export namespace KnexConfig {
    export const config: Config = {
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

    }
}

export default { Database, Server, KnexConfig }