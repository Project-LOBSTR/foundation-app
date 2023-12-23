import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@/components/Button'

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    expect(getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(
      <Button onClick={handleClick}>Click me</Button>,
    )

    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('applies the correct variant class', () => {
    const { getByRole } = render(<Button variant="ghost">Ghost</Button>)
    expect(getByRole('button')).toHaveClass(
      'rounded-md px-2 hover:bg-zinc-50 dark:hover:bg-white/5 shadow-sm text-zinc-500 dark:text-zinc-400',
    )
  })
})
