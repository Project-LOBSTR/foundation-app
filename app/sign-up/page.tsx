'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { generateSecretKey, getPublicKey } from 'nostr-tools'
// import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { login } from '@/redux/features/user'

const SignUp = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const generateNostrKeys = useCallback(() => {
    const secret = generateSecretKey()
    const pubKey = getPublicKey(secret)

    // TODO: show the use to copy down secret

    // const nsec = nsecEncode(secret)
    // const npub = npubEncode(pubKey)

    dispatch(login(pubKey))
    router.push('/dashboard')
  }, [dispatch, router])

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
