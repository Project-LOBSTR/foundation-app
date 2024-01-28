import { ComponentProps } from 'react'

import { IconType } from 'react-icons'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'

import { useStarsRating } from './Root'

type IStartsMap = {
  [key: string]: IconType
}

const starsMap: IStartsMap = {
  filledStars: FaStar,
  emptyStars: FaRegStar,
}

export type ButtonProps = ComponentProps<'button'>

export const Control = (props: ButtonProps) => {
  const { handleRate, ratedList } = useStarsRating()

  return (
    <div className={twMerge('flex', 'flex-row', props.className)}>
      {ratedList.map((star, index) => {
        const Icon = starsMap[star]
        return (
          <button key={index} {...props} onClick={() => handleRate(index + 1)}>
            <Icon color="gold" />
          </button>
        )
      })}
    </div>
  )
}
