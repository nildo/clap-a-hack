const express = require("express");
const path = require('path');
const socketIO = require("socket.io");

const app = express();

app.use(express.static("client/build"));

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'client/build/index.html'));
});

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
      users: [
        ...rooms[room].users,
        { user, color: JSON.parse(color), id, isAdmin: false },
      ],
    };
  } else {
    rooms[room] = {
      users: [{ user, color, isAdmin: true, id }],
      soundLevel: { laugh: 0, clap: 0, boo: 0 },
      reactions: [],
      currentPresentation: -1,
      presentations: [],
      resultsVisible: false,
    };
  }

  client.join(room);

  io.to(room).emit("stateUpdate", rooms[room]);

  client.on("reaction", (data) => {
    const { type } = data;
    const currentRoom = rooms[room];
    const { currentPresentation } = currentRoom;

    let updatedPresentations = [...currentRoom.presentations];
    if (currentPresentation !== -1) {
      updatedPresentations[currentPresentation] = {
        ...updatedPresentations[currentPresentation],
        reactions: {
          ...updatedPresentations[currentPresentation].reactions,
          [type]:
            (updatedPresentations[currentPresentation].reactions[type] || 0) +
            1,
        },
      };
    }

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
      },
    };

    setTimeout(() => {
      rooms[room] = {
        ...rooms[room],
        soundLevel: {
          ...rooms[room].soundLevel,
          [type]:
            rooms[room].soundLevel[type] - 1 > 0
              ? rooms[room].soundLevel[type] - 1
              : 0,
        },
      };
      io.to(room).emit("stateUpdate", rooms[room]);
    }, 3000);

    io.to(room).emit("stateUpdate", rooms[room]);
  });

  client.on("disconnect", (data) => {
    rooms[room] = {
      ...rooms[room],
      users: rooms[room].users.filter((user) => user.id !== client.id),
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  });

  client.on("addPresentation", (data) => {
    const { name } = data;
    rooms[room] = {
      ...rooms[room],
      currentPresentation: rooms[room].currentPresentation + 1,
      presentations: [
        ...rooms[room].presentations,
        {
          name,
          reactions: {
            clap: 0,
            laugh: 0,
            boo: 0,
          },
        },
      ],
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  });

  client.on("setActivePresentation", (data) => {
    const { presentationIndex } = data;
    rooms[room] = {
      ...rooms[room],
      currentPresentation: presentationIndex,
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  });

  client.on("deletePresentation", (data) => {
    const { presentationIndex } = data;
    const presentationsNew = rooms[room].presentations;
    presentationsNew.splice(presentationIndex, 1);
    rooms[room] = {
      ...rooms[room],
      presentations: presentationsNew,
      currentPresentation: 0
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  })

  client.on("makeAdmin", (data) => {
    const { userToAdmin } = data;
    rooms[room] = {
      ...rooms[room],
      users: rooms[room].users.map((user) => {
        if (user.id === userToAdmin.id)
          return {
            ...user,
            isAdmin: true
          };
        else return user;
      }),
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  })

  client.on("removeAdmin", (data) => {
    const { userToDeadmin } = data;
    rooms[room] = {
      ...rooms[room],
      users: rooms[room].users.map((user) => {
        if (user.id === userToDeadmin.id)
          return {
            ...user,
            isAdmin: false
          };
        else return user;
      }),
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  })

  client.on("showResults", (data) => {
    rooms[room] = {
      ...rooms[room],
      resultsVisible: !rooms[room].resultsVisible,
    };
    io.to(room).emit("stateUpdate", rooms[room]);
  });
});

io.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});
