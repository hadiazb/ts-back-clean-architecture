import { Server } from './server/server';
import { config } from './config';

const server = new Server();

if (config.app.env === 'develop') {
  server.start();
}
