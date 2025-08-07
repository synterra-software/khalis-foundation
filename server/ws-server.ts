import type { ClientMsg, OptionId, ServerMsg } from '@/shared/types';
import { WebSocketServer, WebSocket } from 'ws';

const ONLINE_USERS_COUNT_TO_SHOW = 10;

const port = process.env.NEXT_PUBLIC_SERVER_PORT
  ? parseInt(process.env.NEXT_PUBLIC_SERVER_PORT)
  : 3001;
const wss = new WebSocketServer({ port });

const clients = new Map<WebSocket, string>();
const votes = new Map<OptionId, number>();

console.log(`WebSocket server running on ws://localhost:${port}`);

wss.on('connection', (ws: WebSocket) => {
  console.log('Client connected');

  ws.on('message', (data: Buffer) => {
    try {
      const message: ClientMsg = JSON.parse(data.toString());

      switch (message.type) {
        case 'join':
          handleJoin(ws, message.name);
          break;

        case 'vote':
          handleVote(ws, message.optionId);
          break;

        default:
          console.log('Unknown message type:', message);
          handleError(ws, 'Unknown message type');
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    handleDisconnect(ws);
    console.log('Client disconnected');
  });

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error);
  });
});

const handleJoin = (ws: WebSocket, name: string): void => {
  clients.set(ws, name);

  console.log(`${name} joined`);

  ws.send(
    JSON.stringify({
      type: 'state',
      online: Array.from(clients.values()).slice(
        clients.size - ONLINE_USERS_COUNT_TO_SHOW,
        clients.size
      ),
      onlineCount: clients.size,
      votes: formatVotes(),
    })
  );

  broadcastPresence();
};

const handleVote = (ws: WebSocket, optionId: OptionId): void => {
  const client = clients.get(ws);

  if (!client) {
    return;
  }

  votes.set(optionId, (votes.get(optionId) || 0) + 1);
  console.log(`${client} voted: ${optionId}`);
  broadcastCounts();
};

const handleDisconnect = (ws: WebSocket): void => {
  const client = clients.get(ws);

  if (client) {
    clients.delete(ws);
    broadcastPresence();
  }
};

const handleError = (ws: WebSocket, message: string): void => {
  ws.send(
    JSON.stringify({
      type: 'error',
      message,
    })
  );
};

const broadcastPresence = (): void => {
  broadcast({
    type: 'presence',
    online: Array.from(clients.values()).slice(clients.size - 10, clients.size),
    onlineCount: clients.size,
  });
};

const broadcastCounts = (): void => {
  broadcast({
    type: 'votes',
    votes: formatVotes(),
  });
};

const broadcast = (message: ServerMsg): void => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

const formatVotes = (): Record<OptionId, number> => ({
  A: votes.get('A') || 0,
  B: votes.get('B') || 0,
  C: votes.get('C') || 0,
});
