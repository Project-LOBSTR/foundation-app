import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

import { twMerge } from 'tailwind-merge'

type ListItems = 'filledStars' | 'emptyStars'

type IList = ListItems[]

type IStars = {
  initialRating?: number
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

type RootProps = {
  initialRating?: number
}

type Props = ComponentProps<'div'> & RootProps

type IStarsContext = {
  handleRate: (userRating: number) => void
  ratedList: IList
  rate: number
}

export const StarsContext = createContext({} as IStarsContext)

export const Root = ({ initialRating = 0, ...props }: Props) => {
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

  return (
    <StarsContext.Provider value={{ handleRate, ratedList, rate }}>
      <div {...props} />
    </StarsContext.Provider>
  )
}

export const useStarsRating = () => useContext(StarsContext)
