const express = require("express");
const socketIO = require("socket.io");

const app = express();

app.use(express.static("client/build"));

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const io = socketIO(listener, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

 const rooms = {};


io.on("connection", (client) => {
  const { id } = client;
  const { room = "test", user = "anonymous fox", color = "blue" } =
    client.handshake.query || {};

  if (rooms[room]) {
    rooms[room] = {
      ...rooms[room],
      users: [...rooms[room].users, { user, color, id }],
    };
  } else {
    rooms[room] = {
      users: [{ user, color }],
      soundLevel: 1,
      reactions: [],
      currentPresentation: -1,
      presentations: [],
    };
  }
  console.table(rooms)
  client.join(room);

  io.emit("stateUpdate", rooms[room]);

  client.on("reaction", (data) => {
    const { type } = data;
    const currentRoom = rooms[room];
    const { currentPresentation } = currentRoom;

    let updatedPresentations = [...currentRoom.presentations];

    updatedPresentations[currentPresentation] = {
      ...updatedPresentations[currentPresentation],
      [type]: updatedPresentations[currentPresentation][type] + 1,
    };

    rooms[room] = {
      ...currentRoom,
      presentations: updatedPresentations,
      reactions: {
        ...currentRoom.reactions,
        [type]: currentRoom.reactions[type] + 1,
      },
    };

    io.emit("stateUpdate", rooms[room]);
  });

  client.on("disconnect", (data) => {
    console.log("data is", client.id);
    rooms[room] = {
      ...rooms[room],
      users: rooms[room].users.filter((user) => user.id !== client.id),
    };
    io.emit("stateUpdate", rooms[room]);
  });
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});
