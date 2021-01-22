
import { KnexConfig } from '../config'

let dbConfig;
switch (process.env.NODE_ENV) {
    case 'production':
        dbConfig = KnexConfig.production;
        break;
    default:
        dbConfig = KnexConfig.development;
}

export default dbConfig;