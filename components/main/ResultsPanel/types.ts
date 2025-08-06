import type { Status } from '@/shared/types'

export type ResultsPanelProps = {
  status: Status
  results: Record<string, number>
}
