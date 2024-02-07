'use client'
import { useCallback, useState } from 'react'

import { useDispatch } from 'react-redux'
import { twMerge } from 'tailwind-merge'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { APP_MODE, setMode } from '@/redux/features/mode'

export type Mode = {
  name: string
  mode: APP_MODE
}

const modeOptions: Mode[] = [
  { name: 'Scuba Diving', mode: APP_MODE.SCUBA_DIVING },
  {
    // TODO: only in development mode
    name: 'Demo (dev mode)',
    mode: APP_MODE.DEMO,
  },
]

const ChooseAppMode = () => {
  const [selectedMode, setSelectedMode] = useState<APP_MODE | null>(null)

  const dispatch = useDispatch()

  const onSubmit = useCallback(() => {
    if (!selectedMode) return

    dispatch(setMode({ appMode: selectedMode }))

    // TODO: navigate
  }, [dispatch, selectedMode])

  return (
    <Layout canGoBack={false}>
      <div className="flex flex-col w-full h-full py-10 items-center ">
        <LobstrLogo size={200} />
      </div>
      <div className="flex flex-col gap-2 p-6 align-middle items-center">
        <h1 className="text-primary-500 font-heading font-semibold">
          Choose your destiny
        </h1>
        {modeOptions.map(({ name, mode }: Mode) => {
          const isSelected = mode === selectedMode

          return (
            <div
              key={mode}
              className={twMerge(
                'text-primary-700 border-primary-700 border rounded-md px-2 py-4 w-full font-bold',
                isSelected && 'bg-gradient-lobstr text-white border-none',
              )}
              onClick={() => setSelectedMode(mode)}
            >
              {name}
            </div>
          )
        })}
        <Button variant="ghost" onClick={onSubmit}>
          Continue
        </Button>
      </div>
    </Layout>
  )
}

export default ChooseAppMode
