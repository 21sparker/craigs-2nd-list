import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/CommonRoutesConfig';
import { UserRoutes } from './user/UserRoutes';
import debug from 'debug';
import { Model } from 'objection';
import Knex from 'knex';
import { KnexConfig } from '../config';
import { CategoryRoutes } from './category/CategoryRoutes';
import { AuthRoutes } from './auth/AuthRoutes';
import { PostRoutes } from './post/PostRoutes';

let dbConfig;
switch (process.env.NODE_ENV) {
    case 'production':
        dbConfig = KnexConfig.production;
        break;
    case 'test':
        dbConfig = KnexConfig.test;
        break;    
    default:
        dbConfig = KnexConfig.development;
}

// Initialize knex.
export const knex = Knex(dbConfig);

// Give the knex instance to objection
Model.knex(knex);

export const app: express.Application = express();

const routes: Array<CommonRoutesConfig> = [];

const debugLog: debug.IDebugger = debug('app');

// Parse requests as json
app.use(express.json());

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

// middleware to allow cross-origin requests
app.use(cors(corsOptions));

// adding routes
routes.push(new UserRoutes(app));
routes.push(new CategoryRoutes(app));
routes.push(new AuthRoutes(app))
routes.push(new PostRoutes(app));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}))

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: "You got me!" });
})

export default { app, knex };

// TODO: Update with this error handler:
// http://vincit.github.io/objection.js/recipes/error-handling.html#examples

