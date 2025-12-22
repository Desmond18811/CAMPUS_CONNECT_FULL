import { Server as SocketIO } from 'socket.io';

let io;

export const initSocket = (server) => {
    io = new SocketIO(server, {
        cors: {
            origin: "*", // Adjust this to specific origins in production
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('joinResource', (resourceId) => {
            socket.join(resourceId);
            console.log(`User ${socket.id} joined resource ${resourceId}`);
        });

        socket.on('leaveResource', (resourceId) => {
            socket.leave(resourceId);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};