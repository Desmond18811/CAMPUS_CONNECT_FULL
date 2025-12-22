import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const SERVER_URL = 'https://campcon-test.onrender.com'; // Adjust if needed for local dev

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const newSocket = io(SERVER_URL, {
                query: { token },
                transports: ['websocket', 'polling']
            });

            setSocket(newSocket);

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
            });

            return () => newSocket.close();
        }
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
