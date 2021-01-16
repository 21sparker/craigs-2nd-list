import app from './app';
import { PORT } from './config/constants';

const server = app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})

export default server;