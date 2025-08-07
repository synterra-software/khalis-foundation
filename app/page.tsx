'use client';

import {
  PresencePanel,
  ResultsPanel,
  VotingForm,
  GreetingForm,
} from '@/components/main';
import { useHome } from '@/hooks/use-home';
import { WebSocketProvider } from '@/providers/WebSocketProvider';

const HomePage = () => {
  const { onlineUsers, onlineUsersCount, votes, sendJsonMessage, readyState } =
    useHome();

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

          <div>
            <VotingForm
              options={['A', 'B', 'C']}
              sendMessage={sendJsonMessage}
            />
          </div>
        </section>

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
