import { memo, type FC } from 'react'
import type { PresencePanelProps } from './types'

export const PresencePanel: FC<PresencePanelProps> = memo(({ status, users, onlineCount }) => {
  if (status === 'Error') {
    return (
      <div>
        <p>Error loading users</p>
      </div>
    )
  }

  if (status === 'Loading') {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className='text-xl'>{`Online ${onlineCount}`}</h2>

      <ul>
        {users.map((user, index) => (
          <li key={index} className='max-w-full overflow-hidden text-ellipsis'>{user}</li>
        ))}
      </ul>
    </div>
  )
})

PresencePanel.displayName = 'PresencePanel'
