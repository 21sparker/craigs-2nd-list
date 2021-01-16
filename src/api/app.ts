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


// Process json requests
app.use(express.json());

// Add routes
app.use('/user', userRouter);

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: "You got me!" });
})

export default app;

// TODO: Update with this error handler:
// http://vincit.github.io/objection.js/recipes/error-handling.html#examples

