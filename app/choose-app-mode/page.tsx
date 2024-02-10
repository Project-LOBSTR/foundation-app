'use client'
import { useCallback, useEffect, useState } from 'react'

import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import Logo from '@/assets/lobstr-logo.png'
import subaImage from '@/assets/scuba.webp'
import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { APP_MODE, setMode } from '@/redux/features/mode'
import { useAppSelector } from '@/redux/store'

export type Mode = {
  name: string
  mode: APP_MODE
  image?: StaticImageData
}

const modeOptions: Mode[] = [
  { name: 'Scuba Diving', mode: APP_MODE.SCUBA_DIVING, image: subaImage },
  {
    // TODO: only in development mode
    name: 'Demo (dev mode)',
    mode: APP_MODE.DEMO,
  },
]

const ChooseAppMode = () => {
  const [selectedMode, setSelectedMode] = useState<APP_MODE | null>(null)

  const { pubKey } = useAppSelector(({ mode, user }) => {
    return {
      mode: mode.appMode,
      pubKey: user.publickey,
    }
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = useCallback(() => {
    if (!selectedMode) return

    dispatch(setMode({ appMode: selectedMode }))

    // TODO: navigate
  }, [dispatch, selectedMode])

  useEffect(() => {
    if (!pubKey) router.push('/')
  }, [pubKey, router])

  return (
    <Layout canGoBack={false}>
      <div className="bg-gradient-to-b from-blue-500 to-teal-500">
        <div className="flex flex-col h-screen bg-white/10 backdrop-blur-lg border-x border-gray-100 w-full max-w-3xl mx-auto px-4">
          <LobstrLogo size={200} />
          <div className="flex-1">
            <strong className="block font-heading text-3xl text-primary-500 text-center mb-6">
              Choose your destiny
            </strong>
            {modeOptions.map(({ name, mode, image }: Mode) => {
              const isSelected = mode === selectedMode
              const conditionalStyles = isSelected
                ? 'border-4 border-solid border-primary-400'
                : 'bg-gradient-lobstr border-none text-white'

              return (
                <div
                  key={mode}
                  className={`relative flex h-16 w-full  my-1 mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-full shadow-lg transition duration-200 ${conditionalStyles}`}
                  onClick={() => setSelectedMode(mode)}
                >
                  <Image
                    src={image || Logo}
                    alt={name}
                    className="h-full w-full object-cover opacity-70 hover:opacity-100"
                  />
                  <span className="pointer-events-none absolute flex h-full w-full items-center justify-center text-center font-bold">
                    {name}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="pb-8">
            {/* TODO: Proper disable class and styles for button */}
            <Button
              variant="primary"
              onClick={onSubmit}
              disabled={!selectedMode}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ChooseAppMode
