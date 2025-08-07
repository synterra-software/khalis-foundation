import { ReadyState } from 'react-use-websocket';

export type GreetingFormProps = {
  readyState: ReadyState;
  sendMessage: (message: string) => void;
};
