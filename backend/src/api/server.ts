import { app } from './app';
import { Server } from '../config';

const server = app.listen(Server.port, () => {
    console.log(`Server started at port ${Server.port}`);
})

export default server;