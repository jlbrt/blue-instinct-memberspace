import http from 'http';
import { app } from './web/app';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);

const port = 3000;
server.listen(port, () => {
  console.log(`Web server listening on *:${port}`);
});
