'use client'
import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { generateSecretKey, getPublicKey } from 'nostr-tools'
import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { login } from '@/redux/features/user'
import { useAppSelector } from '@/redux/store'

const SignUp = () => {
  const [keys, setKeys] = useState<Record<string, string | Uint8Array> | null>(
    null,
  )

  const userNpub = useAppSelector(({ user }) => user.publickey)

  const dispatch = useDispatch()
  const router = useRouter()

  const generateNostrKeys = useCallback(() => {
    const secret = generateSecretKey()
    const pubKey = getPublicKey(secret)

    const nsec = nsecEncode(secret)
    const npub = npubEncode(pubKey)

    setKeys({ nsec, npub })

    dispatch(login(pubKey))
  }, [dispatch])

  useEffect(() => {
    if (userNpub) router.push('/dashboard')
  }, [
    router,
    /** userNpub not a dependency */
  ])

  if (keys)
    return (
      <Layout>
        <div className="flex flex-col w-full h-full py-10 items-center ">
          <LobstrLogo size={200} />
        </div>
        <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
          <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-10">
            Save your keys somewhere safe
          </h1>
          <p className="text-center bg-gray-100 rounded-md text-black align-center">
            {keys?.npub.slice(0, 30)}....
          </p>
          <p className="text-center bg-gray-100 rounded-md text-black align-center">
            {keys?.nsec.slice(0, 30)}....
          </p>
          <Button variant="primary" onClick={() => router.push('/dashboard')}>
            Continue
          </Button>
        </div>
      </Layout>
    )

  return (
    <Layout>
      <div className="flex flex-col w-full h-full py-10 items-center ">
        <LobstrLogo size={200} />
      </div>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-20">
        <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-10">
          Create new account
        </h1>
        <Button variant="primary" onClick={generateNostrKeys}>
          Create NOSTR account
        </Button>
      </div>
    </Layout>
  )
}

export default SignUp
