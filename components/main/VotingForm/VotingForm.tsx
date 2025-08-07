'use client';

import { memo, useCallback, type FC, type FormEvent } from 'react';
import { Button } from '@/shared/components';
import type { VotingFormProps } from './types';
import { FORM_DEBOUNCE_TIME } from './constants';
import { OptionId } from '@/shared/types';
import { useDebouncedCallback } from 'use-debounce';

export const VotingForm: FC<VotingFormProps> = memo(
  ({ options, sendMessage }) => {
    const debounceCall = useDebouncedCallback(
      (value) => sendMessage({ type: 'vote', optionId: value }),
      FORM_DEBOUNCE_TIME,
      { leading: true }
    );

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      debounceCall(
        (event.currentTarget.elements.namedItem('vote') as HTMLInputElement)
          .value as OptionId
      );
    }, []);

    return (
      <form
        className="flex flex-col gap-2 items-center"
        onSubmit={handleSubmit}
      >
        <p>Some question</p>

        {options.map((option, index) => (
          <label key={index} className="cursor-pointer">
            <input
              type="radio"
              name="vote"
              value={option}
              className="mr-2 cursor-pointer"
              aria-label={`option ${option}`}
            />
            {option}
          </label>
        ))}

        <Button type="submit">Submit Vote</Button>
      </form>
    );
  }
);

VotingForm.displayName = 'VotingForm';
