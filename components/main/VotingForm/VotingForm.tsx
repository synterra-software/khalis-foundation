'use client'

import debounce from 'lodash.debounce'

import { memo, useCallback, useEffect, useMemo, type FC, type FormEvent } from 'react'
import { Button } from '@/shared/components'
import type { VotingFormProps } from './types'
import { FORM_DEBOUNCE_TIME } from './constants'

export const VotingForm: FC<VotingFormProps> = memo(({ options, sendMessage }) => {
  const debouncedSend = useMemo(
    () =>
      debounce(
        (value: string) => sendMessage(JSON.stringify({ type: 'vote', optionId: value })),
        FORM_DEBOUNCE_TIME,
        { leading: true }
      ),
    [sendMessage]
  )

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const selectedOption = event.currentTarget.elements.namedItem('vote') as HTMLInputElement
    debouncedSend(selectedOption.value)
    }, [debouncedSend])

  useEffect(() => {
    return () => {
      debouncedSend.cancel()
    }
  }, [debouncedSend])

  return (
    <form className='flex flex-col gap-2 items-center' onSubmit={handleSubmit}>
      <p>Some question</p>

      {options.map((option, index) => (
        <label key={index} className='cursor-pointer'>
          <input type='radio' name='vote' value={option} className='mr-2 cursor-pointer' aria-label={`option ${option}`} />
          {option}
        </label>
      ))}

      <Button type='submit'>Submit Vote</Button>
    </form>
  )
})

VotingForm.displayName = 'VotingForm'
