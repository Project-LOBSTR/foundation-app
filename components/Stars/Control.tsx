import { ComponentProps, useCallback, useMemo, useState } from 'react'

import { IconType } from 'react-icons'
import { FaRegStar, FaStar } from 'react-icons/fa'

// TODO:
// 1. Add CSS according to design
// 2. Do we want the user to change the rating?
// 3. Add tests

type IStartsMap = {
  [key: string]: IconType
}

type ListItems = 'filledStars' | 'emptyStars'

type IList = ListItems[]

type IStars = {
  initialRating?: number
}

const starsMap: IStartsMap = {
  filledStars: FaStar,
  emptyStars: FaRegStar,
}

export type ButtonProps = ComponentProps<'button'> & IStars

const listSize = 5

const filledStarsList: IList = Array(listSize).fill('filledStars')
const emptyStarsList: IList = Array(listSize).fill('emptyStars')

const list: IList = [...filledStarsList, ...emptyStarsList]

const rating = (rating: number) => {
  const total = list.length
  const halfTotal = total / 2
  return list.slice(halfTotal - rating, total - rating)
}

export const Control = ({ initialRating = 0, ...props }: ButtonProps) => {
  const [rate, setRate] = useState(initialRating)

  const ratedList = useMemo(() => rating(rate), [rate])

  const handleRate = useCallback(
    (userRating: number) => {
      const removeRating = rate === 1 && userRating === 1
      if (removeRating) {
        setRate(0)
        return
      }
      setRate(userRating)
    },
    [rate],
  )

  return ratedList.map((star, index) => {
    const Icon = starsMap[star]
    return (
      <button {...props} key={index} onClick={() => handleRate(index + 1)}>
        <Icon color="gold" />
      </button>
    )
  })
}
