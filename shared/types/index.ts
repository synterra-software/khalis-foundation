export type Status = 'Loading' | 'Ready' | 'Error';

export type OptionId = 'A' | 'B' | 'C';

export type ClientMsg =
  | { type: 'join'; name: string }
  | { type: 'vote'; optionId: OptionId };

export type ServerMsg =
  | { type: 'presence'; online: string[]; onlineCount: number }
  | { type: 'votes'; votes: Record<OptionId, number> }
  | {
      type: 'state';
      online: string[];
      onlineCount: number;
      votes: Record<OptionId, number>;
    }
  | { type: 'error'; message: string };
