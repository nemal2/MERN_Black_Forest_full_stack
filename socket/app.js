import { Server, Socket } from "socket.io";

const io = new Server({
  cors: {
    origin: [
      "http://localhost:5173", // Development origin
      "https://black-forest.vercel.app" // Production origin
    ],
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
}

io.on("connection", (socket) => {
  socket.on("test", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({receiverId, data})=>{
    console.log(receiverId);
    io.to(receiver.socketId).emit("getMessage", data);
  })

  socket.on("disconnect", ()=> {
    removeUser(socket.id)
  })
});

io.listen("4000");
