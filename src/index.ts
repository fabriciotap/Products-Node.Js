import express from 'express';
import { PORT } from './config';
import { connectToMongodb } from "./database";
import { router } from './router';

const main = async () => {
    await connectToMongodb();
    const server = express();
    server.use(express.json());
    router(server);

    //Start server
    server.listen(PORT, () => {
        console.log('The application is listening on port ' + PORT);
    });
}

main();