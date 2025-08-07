import { useWebSocketContext } from '@/providers/WebSocketProvider';
import { USER_NAME_SET_EVENT, USER_NAME_STORAGE_KEY } from '@/shared/constants';
import { useEffect, useState } from 'react';

export const useApp = () => {
  const { sendJsonMessage, lastJsonMessage, readyState } =
    useWebSocketContext();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const listener = () => setIsLoggedIn(true);

    if (localStorage.getItem(USER_NAME_STORAGE_KEY) !== null) {
      listener();
    }

    window.addEventListener(USER_NAME_SET_EVENT, listener);

    return () => {
      window.removeEventListener(USER_NAME_SET_EVENT, listener);
    };
  }, []);

  useEffect(() => {
    if (!lastJsonMessage) {
      return;
    }

    switch (lastJsonMessage.type) {
      case 'presence':
        setOnlineUsers(lastJsonMessage.online);
        setOnlineUsersCount(lastJsonMessage.onlineCount);
        break;

      case 'votes':
        setVotes(lastJsonMessage.votes);
        break;

      default:
        break;
    }
  }, [lastJsonMessage]);

  return {
    isLoggedIn,
    onlineUsers,
    onlineUsersCount,
    votes,
    sendJsonMessage,
    readyState,
  };
};
