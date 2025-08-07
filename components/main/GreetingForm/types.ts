import type { WebSocketContextType } from '@/providers/WebSocketProvider'
import { ReadyState } from 'react-use-websocket'

export type GreetingFormProps = {
  readyState: ReadyState
  sendMessage: WebSocketContextType['sendJsonMessage']
}
