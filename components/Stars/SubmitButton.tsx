import { ComponentProps } from 'react'

import { Button } from '../Button'

import { useStarsRating } from './Root'

export type ButtonProps = ComponentProps<'button'>

// TODO: add NOSTR logic action here
export const SubmitButton = (props: ButtonProps) => {
  const { rate } = useStarsRating()

  return (
    <Button
      {...props}
      variant="primary"
      onClick={() => console.log(`whatever i want to do with ${rate} `)}
      className="w-full sm:w-auto"
    />
  )
}
