const express = require("express");
const socketIO = require('socket.io');

const app = express();

app.use(express.static("client/build"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const io = socketIO(listener);

const state = {
  numOnlineUsers: 0,
  laughCount: 0,
};

io.on('connection', (client) => {
  state.numOnlineUsers++;
  io.emit('stateUpdate', state);
  console.log('A user connected:', state.numOnlineUsers);

  client.on('laugh', () => {
    state.laughCount++;
    io.emit('stateUpdate', state);
    console.log('Laugh received:', state.laughCount);

    setTimeout(() => {
      state.laughCount--;
      io.emit('stateUpdate', state);
      console.log('Laugh timed out:', state.laughCount);
    }, 5000);
  });

  client.on('disconnect', () => {
    state.numOnlineUsers--;
    io.emit('stateUpdate', state);
    console.log('A user disconnected:', state.numOnlineUsers);
  });
});
