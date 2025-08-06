import type { Status } from '@/shared/types'

export type PresencePanelProps = {
  status: Status
  users: string[]
  onlineCount: number
}
