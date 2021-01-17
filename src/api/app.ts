import express from 'express';
import winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './routes/CommonRoutesConfig';
import { UserRoutes } from './routes/UserRoutes';
import debug from 'debug';
import { Model } from 'objection';
import Knex from 'knex';
import { KnexConfig } from '../config';
import { Debugger } from 'inspector';
// import { userRouter } from '../..';

// Initialize knex.
const knex = Knex(KnexConfig.config);

// Give the knex instance to objection
Model.knex(knex);

const app: express.Application = express();

const routes: Array<CommonRoutesConfig> = [];

const debugLog: debug.IDebugger = debug('app');

// Parse requests as json
app.use(express.json());

// middleware to allow cross-origin requests
app.use(cors());

// configuring expressWinston loggin middleware
// which automatically log all HTTP requests handled by Express.js
// app.use(expressWinston.logger({
//     transports: [
//         new winston.transports.Console()
//     ],
//     format: winston.format.combine(
//         winston.format.colorize(),
//         winston.format.json()
//     )
// }))


// adding routes
routes.push(new UserRoutes(app));

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}))


// Add routes
// app.use('/user', userRouter);

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: "You got me!" });
})

export default app;

// TODO: Update with this error handler:
// http://vincit.github.io/objection.js/recipes/error-handling.html#examples

