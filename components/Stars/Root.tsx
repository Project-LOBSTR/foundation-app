import { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'

type Props = ComponentProps<'div'>

export const Root = (props: Props) => {
  return (
    <div className={twMerge('flex', 'flex-row', props.className)} {...props} />
  )
}
