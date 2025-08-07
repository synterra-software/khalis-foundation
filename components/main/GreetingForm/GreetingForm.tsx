import { Button } from '@/shared/components';
import { memo, type FC, type FormEvent } from 'react';
import { ReadyState } from 'react-use-websocket';
import { GreetingFormProps } from './types';
import { USER_NAME_STORAGE_KEY } from '@/shared/constants';

export const GreetingForm: FC<GreetingFormProps> = memo(
  ({ readyState, sendMessage }) => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const input = event.currentTarget.elements.namedItem(
        'name'
      ) as HTMLInputElement;

      localStorage.setItem(USER_NAME_STORAGE_KEY, input.value);
      sendMessage({ type: 'join', name: input.value });
    };

    return (
      <div className="w-full">
        <form
          className="w-full flex flex-col gap-2 items-center"
          onSubmit={onSubmit}
        >
          <p>Greetings, please introduce yourself</p>

          <input
            type="text"
            minLength={1}
            className="w-full border-b border-b-blue-500 max-w-3xl"
            name="name"
            placeholder="Enter your name"
            aria-labelledby="submitbutton"
          />

          <Button
            id="submitbutton"
            type="submit"
            disabled={readyState !== ReadyState.OPEN}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
);

GreetingForm.displayName = 'GreetingForm';
