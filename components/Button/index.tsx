'use client'

import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const button = tv({
  base: [
    'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
    'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-500',
    'active:opacity-80',
  ],

  variants: {
    variant: {
      primary:
        ' text-white dark:hover:bg-violet-600 hover:bg-violet-700 bg-violet-600 dark:bg-violet-500',
      ghost:
        'rounded-md px-2 hover:bg-zinc-50 dark:hover:bg-white/5 shadow-sm text-zinc-500 dark:text-zinc-400',
      outline:
        'border border-zinc-300 text-zinc-700 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-700 dark:border-zinc-700',
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
})

export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof button>

export const Button = ({ variant, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={button({
        variant,
        className,
      })}
    />
  )
}
