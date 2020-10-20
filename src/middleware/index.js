import nextConnect from 'next-connect';
import database from './database';
import socketio from './socketio';

const middleware = nextConnect();

middleware.use(database)

// .use(socketio);
export default middleware;
