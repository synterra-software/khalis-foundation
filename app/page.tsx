'use client'

import { PresencePanel, ResultsPanel, VotingForm, GreetingForm } from '@/components/main'
import { useHome } from '@/hooks/use-home'

export default function Home() {
  const { onlineUsers, onlineUsersCount, votes, sendMessage, readyState } = useHome()

  return (
    <div className='font-sans flex min-h-screen p-8'>
      <main className='w-full flex gap-2'>
        <div className='flex flex-col justify-center gap-20 shrink-1 basis-0 flex-grow-[3]'>
          <GreetingForm readyState={readyState} sendMessage={sendMessage} />
          <VotingForm options={['A', 'B', 'C']} sendMessage={sendMessage} />
        </div>

        <div className='flex flex-col justify-between shrink-1 basis-0 flex-grow-[1] overflow-hidden'>
          <PresencePanel status='Ready' users={onlineUsers} onlineCount={onlineUsersCount} />
          <ResultsPanel status='Ready' results={votes} />
        </div>
      </main>
    </div>
  )
}
