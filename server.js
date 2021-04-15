const express = require("express");
const socketIO = require("socket.io");

const app = express();

app.use(express.static("client/build"));

const DEFAULT_COLOR = {
  r: 255,
  g: 0,
  b: 0,
  a: 100,
};

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
  const { room = "test", user = "anonymous fox", color = DEFAULT_COLOR } =
    client.handshake.query || {};

  if (rooms[room]) {
    rooms[room] = {
      ...rooms[room],
      users: [...rooms[room].users, { user, color: JSON.parse(color), id }],
    };
  } else {
    rooms[room] = {
      users: [{ user, color }],
      soundLevel: {laugh: 0, clap: 0, boo:0},
      reactions: [],
      currentPresentation: -1,
      presentations: [],
    };
  }
  console.table(rooms);
  client.join(room);

  io.emit("stateUpdate", rooms[room]);

  client.on("reaction", (data) => {
    const { type } = data;
    const currentRoom = rooms[room];
    const { currentPresentation } = currentRoom;

    let updatedPresentations = [...currentRoom.presentations];
    if (currentPresentation !== -1)
      updatedPresentations[currentPresentation] = {
        ...updatedPresentations[currentPresentation],
        [type]: updatedPresentations[currentPresentation][type] + 1,
      };

    rooms[room] = {
      ...currentRoom,
      presentations: updatedPresentations,
      reactions: {
        ...currentRoom.reactions,
        [type]: (currentRoom.reactions[type] || 0) + 1,
      },
      soundLevel: {
        ...currentRoom.soundLevel,
       [type]: currentRoom.soundLevel[type] + 1,
      }
    };
   
    setTimeout(() => {
      rooms[room] = {
        ...rooms[room],
        soundLevel: {
          ...rooms[room].soundLevel,
        [type]: (rooms[room].soundLevel[type] - 1 > 0) ? rooms[room].soundLevel[type] - 1 : 0,
        },
      }
      io.emit("stateUpdate", rooms[room]);
    }, 3000)

    io.emit("stateUpdate", rooms[room]);
  });

  client.on("disconnect", (data) => {
    rooms[room] = {
      ...rooms[room],
      users: rooms[room].users.filter((user) => user.id !== client.id),
    };
    io.emit("stateUpdate", rooms[room]);
  });

  client.on("addPresentation", (data) => {
    const { name } = data;
    rooms[room] = {
      ...rooms[room],
      presentations: [
        ...rooms[room].presentations,
        {
          name,
          reactions: {}
        }
      ]
    };
    io.emit("stateUpdate", rooms[room]);
  });

  client.on("showResults", (data) => {
    rooms[room] = {
      ...rooms[room],
      resultsVisible: true
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
