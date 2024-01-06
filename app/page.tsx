'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { useAppSelector } from '@/redux/store'

type ButtonProps = {
  id: string
  label: string
  buttonText: string
  onClick: () => void
}

export default function Home() {
  const router = useRouter()
  const userNpub = useAppSelector(({ publickey }) => publickey)

  useEffect(() => {
    if (userNpub) router.push('/dashboard')
  }, [router, userNpub])

  const buttons: ButtonProps[] = [
    {
      id: 'sign-up',
      label: 'New NOSTR user?',
      buttonText: 'Create new account',
      onClick: () => router.push('/sign-up'),
    },
    {
      id: 'sign-in',
      label: 'Existing NOSTR user?',
      buttonText: 'Sign in with NOSTR',
      onClick: () => router.push('/sign-in'),
    },
  ]

  return (
    <Layout heading="Welcome to LOBSTR">
      <div className="my-10 flex flex-col items-center gap-8">
        {buttons.map(({ id, label, buttonText, onClick }) => (
          <div key={id} className="text-center">
            <p className="mb-2 text-sm font-medium text-zinc-500">{label}</p>
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
