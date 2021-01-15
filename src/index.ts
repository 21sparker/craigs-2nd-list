import express from 'express';
import { Model } from 'objection';
import Knex from 'knex';
import knexConfig from '../knexfile';
import { PORT } from './config/constants';
import { userRouter } from './routes';


// Initialize knex.
const knex = Knex(knexConfig.development);

// Give the knex instance to objection
Model.knex(knex);

const app = express();

// Process json requests
app.use(express.json());

// Add routes
app.use('/user', userRouter);

app.get('/', (req: express.Request, res: express.Response) => {
    res.json({ message: "You got me!" });
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

  
// TODO: Update with this error handler:
// http://vincit.github.io/objection.js/recipes/error-handling.html#examples

