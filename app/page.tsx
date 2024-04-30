'use client'

import { useEffect } from 'react'

import { Button, Heading, Text } from '@lobstr/react'
import { useRouter } from 'next/navigation'

import Layout from '@/components/Layout'
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
    if (userNpub) router.push(routes.personalDetails)
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
    <Layout canGoBack={false} logoSize={300}>
      <div className="flex flex-col items-center gap-4 px-10">
        <div className="gap-2 flex flex-col">
          <Heading className="text-center" size="h4">
            Welcome to LOBSTR
          </Heading>
          <Text className="text-center">
            Create your NOSTR account or log in with your existing account
          </Text>
        </div>
        <div className="flex w-full flex-col gap-2">
          {buttons.map(({ id, buttonText, onClick }) => (
            <Button.Root
              data-cy={`${id}-button`}
              key={id}
              className="w-full justify-center"
              variant="primary"
              onClick={onClick}
            >
              {buttonText}
            </Button.Root>
          ))}
        </div>
      </div>
    </Layout>
  )
}
