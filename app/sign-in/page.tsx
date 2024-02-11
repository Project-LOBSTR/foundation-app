'use client'

import { useCallback, useState } from 'react'

import { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { nip19 } from 'nostr-tools'
import { FaFileSignature } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { login } from '@/redux/features/user'

const SignIn = () => {
  const [nsec, setNsec] = useState<string | undefined>(undefined)

  const router = useRouter()
  const dispatch = useDispatch()

  const loginWithPrivKey = useCallback(async () => {
    if (!nsec) return

    const privatekey = nip19.decode(nsec)

    if (!privatekey?.data) return

    const privKeySigner = new NDKPrivateKeySigner(privatekey.data as string)

    const user = await privKeySigner.user()

    if (user.pubkey) {
      dispatch(login(user.pubkey))
      // TODO: depends if they've onboarded on lobstr already
      router.push('/choose-app-mode')
    }
  }, [dispatch, nsec, router])

  const loginWithSigner = useCallback(async () => {
    const nip07signer = new NDKNip07Signer()

    const user = await nip07signer.user()

    if (user.pubkey) {
      dispatch(login(user.pubkey))
      // TODO: depends if they've onboarded on lobstr already
      router.push('/choose-app-mode')
    }
  }, [dispatch, router])

  return (
    <Layout>
      <div className="flex flex-col w-full h-full py-16 items-center ">
        <LobstrLogo size={300} />
      </div>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-10">
          Login to LOBSTR
        </h1>
        {/** TODO: fixed width */}
        <div
          className="flex flex-row gap-2 bg-gradient-lobstr p-2 rounded-md w-40"
          onClick={loginWithSigner}
        >
          <FaFileSignature color="#3A167F" />
          <p className="text-black font-semibold text-xs">Use NOSTR signer</p>
        </div>

        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          onChange={(e) => setNsec(e.target.value)}
          placeholder="Enter your nsec"
          type="password"
        />
        {nsec?.length && (
          <Button variant="primary" onClick={loginWithPrivKey}>
            Use with nsec
          </Button>
        )}
        <div
          className="py-2"
          onClick={() => router.push('/recover-seed-phrase')}
        >
          <p className="text-primary-500 text-xs">
            Recover account with seed phrase
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
