'use client'

import { useEffect } from 'react'

import { Button } from '@lobstr/react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { routes } from '@/constants/routes'
import { useAppSelector } from '@/redux/store'

type ButtonProps = {
  id: string

  buttonText: string
  onClick: () => void
}

export default function Home() {
  const router = useRouter()

  const userNpub = useAppSelector(({ user }) => user.publickey)

  useEffect(() => {
    if (userNpub) router.push(routes.chooseAppMode)
  }, [router, userNpub])

  const buttons: ButtonProps[] = [
    {
      id: 'sign-up',
      buttonText: 'Create new account',
      onClick: () => router.push(routes.signUp),
    },
    {
      id: 'sign-in',
      buttonText: 'Sign in with NOSTR',
      onClick: () => router.push(routes.signIn),
    },
  ]

  return (
    <Layout canGoBack={false}>
      <div className="flex flex-col w-full h-full py-20 items-center bg-gradient-lobstr rounded-b-2xl">
        <LobstrLogo size={300} />
      </div>
      <div className="my-10 flex flex-col items-center gap-5  px-10">
        <div>
          <h1 className="text-3xl  font-semibold text-center font-heading text-black">
            Welcome to LOBSTR
          </h1>
          <p className="text-black font-normal text-center font-body">
            Create your NOSTR account or log in with your existing account
          </p>
        </div>
        {buttons.map(({ id, buttonText, onClick }) => (
          <div key={id} className="justify-center flex w-full">
            <Button.Root variant="primary" onClick={onClick}>
              {buttonText}
            </Button.Root>
          </div>
        ))}
      </div>
    </Layout>
  )
}
