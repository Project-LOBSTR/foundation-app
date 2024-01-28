import { ComponentProps, useId } from 'react'

import { IconType } from 'react-icons'
import { FaRegStar, FaStar } from 'react-icons/fa'

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
  const id = useId()

  const { handleRate, ratedList } = useStarsRating()

  return ratedList.map((star, index) => {
    const Icon = starsMap[star]
    return (
      <button {...props} key={id} onClick={() => handleRate(index + 1)}>
        <Icon color="gold" />
      </button>
    )
  })
}
