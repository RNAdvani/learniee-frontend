import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './useAuth';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user ,fetchUser } = useAuth();

  

  useEffect(() => {
    fetchUser();
    if (user) {
      const newSocket = io('http://localhost:5000');
      setSocket(newSocket);

      newSocket.emit('user_connected', user?._id);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  return socket;
}

