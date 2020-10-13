import Server from 'socket.io';

const socketio = (req, res, next) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io');

    const io = new Server(res.socket.server);
    req.io = io;
  }

  res.end();
};
export default socketio;
