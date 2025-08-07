import { Button } from '@/shared/components';
import { memo, useEffect, useState, type FC, type FormEvent } from 'react';
import { ReadyState } from 'react-use-websocket';
import { GreetingFormProps } from './types';
import { USER_NAME_SET_EVENT, USER_NAME_STORAGE_KEY } from '@/shared/constants';

export const GreetingForm: FC<GreetingFormProps> = memo(
  ({ readyState, sendMessage }) => {
    const [name, setName] = useState('');

    const join = (newName: string) => {
      sendMessage({ type: 'join', name: newName });
      window.dispatchEvent(new CustomEvent(USER_NAME_SET_EVENT));
      setName(newName);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const input = event.currentTarget.elements.namedItem(
        'name'
      ) as HTMLInputElement;

      localStorage.setItem(USER_NAME_STORAGE_KEY, input.value);
      join(input.value)
    };

    useEffect(() => {
      const storedName = localStorage.getItem(USER_NAME_STORAGE_KEY);
      if (storedName) {
        join(storedName);
      }
    }, [])

    return (
      <div className="w-full">
        <form
          className="w-full flex flex-col gap-2 items-center"
          onSubmit={onSubmit}
        >
          <label htmlFor="name">Greetings, {name || 'please introduce yourself'}</label>

          <input
            id="name"
            type="text"
            minLength={1}
            required
            className="w-full border-b border-b-blue-500 max-w-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="name"
            placeholder="Enter your name"
            aria-required="true"
          />

          <div
            id="connection-status"
            className="text-sm"
            role="status"
            aria-live="polite"
          >
            {readyState === ReadyState.CONNECTING && (
              <span className="text-yellow-600">Connecting...</span>
            )}
            {readyState === ReadyState.OPEN && (
              <span className="text-green-600">Connected</span>
            )}
            {readyState === ReadyState.CLOSING && (
              <span className="text-orange-600">Disconnecting...</span>
            )}
            {readyState === ReadyState.CLOSED && (
              <span className="text-red-600">Disconnected</span>
            )}
            {readyState === ReadyState.UNINSTANTIATED && (
              <span className="text-gray-600">Not connected</span>
            )}
          </div>

          <Button
            id="submitbutton"
            type="submit"
            disabled={readyState !== ReadyState.OPEN}
            aria-describedby="connection-status"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
);

GreetingForm.displayName = 'GreetingForm';
