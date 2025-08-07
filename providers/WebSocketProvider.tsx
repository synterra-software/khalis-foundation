import type { ClientMsg, ServerMsg } from '@/shared/types'
import { createContext, useContext, type FC, type ReactNode } from 'react'
import useWebSocket, { ReadyState, Options } from 'react-use-websocket'

type WebSocketProviderProps = {
  children: ReactNode
  socketUrl: string
  options?: Options
}

export type WebSocketContextType = {
  sendJsonMessage: (message: ClientMsg) => void
  lastJsonMessage: ServerMsg
  readyState: ReadyState
}

const MAX_DELAY = 30000

const exponentialBackoff = (attempt: number) =>  Math.min(1000 * 2 ** attempt, MAX_DELAY)

export const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

export const WebSocketProvider: FC<WebSocketProviderProps> = ({ children, socketUrl, options = {} }) => {
  const defaultOptions: Options = {
    shouldReconnect: () => true,
    reconnectAttempts: 10,
    reconnectInterval: exponentialBackoff,
    share: true,
    ...options,
  }

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<ServerMsg>(socketUrl, defaultOptions)

  const value: WebSocketContextType = { sendJsonMessage, lastJsonMessage, readyState }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocketContext = (): WebSocketContextType => {
  const context = useContext(WebSocketContext)

  if (!context) {
    throw new Error('useWebSocketContext visibility error')
  }

  return context
}
