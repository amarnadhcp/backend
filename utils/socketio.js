import { Server } from "socket.io";

let io;

function initialize(server) {
    io = new Server(server, {
      cors: {
        origin: [process.env.BASE_URL],
        credentials: true,
      },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
        
        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
        });
    
        socket.on("send-msg", (data) => {
            const sendUserSocket = onlineUsers.get(data.to);
            if (sendUserSocket) {
                io.to(sendUserSocket).emit("msg-receive", data.msg);
            }
        });
    });
}

export default {
  initialize,
  getIO: () => io,
};
