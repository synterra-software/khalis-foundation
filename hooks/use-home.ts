import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const MAX_DELAY = 30000;

const exponentialBackoff = (attempt: number) =>
  Math.min(1000 * 2 ** attempt, MAX_DELAY);

export const useHome = () => {
  const { lastMessage, sendMessage, readyState } = useWebSocket(
    'ws://localhost:3001',
    {
      shouldReconnect: () => true,
      reconnectAttempts: 10,
      reconnectInterval: exponentialBackoff,
    }
  );
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);
  const [votes, setVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!lastMessage) return;

    const data = JSON.parse(lastMessage.data);

    switch (data.type) {
      case 'presence':
        setOnlineUsers(data.online);
        setOnlineUsersCount(data.onlineCount);
        break;

      case 'votes':
        setVotes(data.votes);
        break;

      case 'state':
        setOnlineUsers(data.online);
        setVotes(data.votes);
        setOnlineUsersCount(data.onlineCount);
        break;

      default:
        break;
    }
  }, [lastMessage]);

  return { onlineUsers, onlineUsersCount, votes, sendMessage, readyState };
};
