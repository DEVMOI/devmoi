import nextConnect from 'next-connect';
import middleware from '../../middleware';

// import { ObjectID }S from 'mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get((req, res) => {
  req.io.on('connection', (socket) => {
    socket.broadcast.emit('a user connected');
    socket.broadcast.emit('disconect');
  });
  req.io.on('post', (socket) => {
    socket.broadcast.emit('post', 'posted');
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req, res) => handler.apply(req, res);
