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