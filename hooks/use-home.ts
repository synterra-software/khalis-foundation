import { useWebSocketContext } from '@/providers/WebSocketProvider'
import { useEffect, useState } from 'react'

export const useHome = () => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocketContext()
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0)
  const [votes, setVotes] = useState<Record<string, number>>({})

  useEffect(() => {
    if (!lastJsonMessage) {
      return
    }

    switch (lastJsonMessage.type) {
      case 'presence':
        setOnlineUsers(lastJsonMessage.online)
        setOnlineUsersCount(lastJsonMessage.onlineCount)
        break

      case 'votes':
        setVotes(lastJsonMessage.votes)
        break

      case 'state':
        setOnlineUsers(lastJsonMessage.online)
        setVotes(lastJsonMessage.votes)
        setOnlineUsersCount(lastJsonMessage.onlineCount)
        break

      default:
        break
    }
  }, [lastJsonMessage])

  return { onlineUsers, onlineUsersCount, votes, sendJsonMessage, readyState }
}
