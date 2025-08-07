import type { WebSocketContextType } from '@/providers/WebSocketProvider';
import type { OptionId } from '@/shared/types';

export type VotingFormProps = {
  options: OptionId[];
  sendMessage: WebSocketContextType['sendJsonMessage'];
};
