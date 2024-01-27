'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
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
    if (userNpub) router.push('/dashboard')
  }, [router, userNpub])

  const buttons: ButtonProps[] = [
    {
      id: 'sign-up',
      buttonText: 'Create new account',
      onClick: () => router.push('/sign-up'),
    },
    {
      id: 'sign-in',
      buttonText: 'Sign in with NOSTR',
      onClick: () => router.push('/sign-in'),
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
          <div key={id} className="text-center w-full">
            <Button
              variant="primary"
              onClick={onClick}
              className="w-full sm:w-auto"
            >
              {buttonText}
            </Button>
          </div>
        ))}
      </div>
    </Layout>
  )
}
