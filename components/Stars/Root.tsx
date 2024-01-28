import { ComponentProps } from 'react'

type Props = ComponentProps<'div'>

export const Root = ({ ...props }: Props) => {
  return <div {...props} />
}
