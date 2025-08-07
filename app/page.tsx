'use client';

import {
  PresencePanel,
  ResultsPanel,
  VotingForm,
  GreetingForm,
} from '@/components/main';
import { useApp } from '@/hooks/useApp';
import { WebSocketProvider } from '@/providers/WebSocketProvider';

const HomePage = () => {
  const {
    isLoggedIn,
    onlineUsers,
    onlineUsersCount,
    votes,
    sendJsonMessage,
    readyState,
  } = useApp();

  return (
    <div className="font-sans flex min-h-screen p-8">
      <main className="w-full flex gap-2">
        <section
          className="flex flex-col justify-center gap-20 shrink-1 basis-0 flex-grow-[3]"
          aria-label="User interaction area"
        >
          <div>
            <h1 className="sr-only">Real-time Voting Application</h1>
            <GreetingForm
              readyState={readyState}
              sendMessage={sendJsonMessage}
            />
          </div>

          {isLoggedIn && (
            <div>
              <VotingForm
                options={['A', 'B', 'C']}
                sendMessage={sendJsonMessage}
              />
            </div>
          )}
        </section>

        {isLoggedIn && (
          <aside
            className="flex flex-col justify-between shrink-1 basis-0 flex-grow-[1] overflow-hidden"
            aria-label="Live information panel"
          >
            <PresencePanel
              status="Ready"
              users={onlineUsers}
              onlineCount={onlineUsersCount}
            />
            <ResultsPanel status="Ready" results={votes} />
          </aside>
        )}
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <WebSocketProvider
      socketUrl={`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}`}
    >
      <HomePage />
    </WebSocketProvider>
  );
}
