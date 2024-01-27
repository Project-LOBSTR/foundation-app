'use client'

import { useCallback, useState } from 'react'

import { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { nip19 } from 'nostr-tools'
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

    console.log(user.pubkey)

    if (user.pubkey) {
      dispatch(login(user.pubkey))
      router.push('/dashboard')
    }
  }, [dispatch, nsec, router])

  const loginWithSigner = useCallback(async () => {
    const nip07signer = new NDKNip07Signer()

    const user = await nip07signer.user()

    if (user.pubkey) {
      dispatch(login(user.pubkey))
      router.push('/dashboard')
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
        <Button variant="primary" onClick={loginWithSigner}>
          Use NOSTR signer
        </Button>
        <Button variant="primary" onClick={loginWithPrivKey}>
          Use with nsec
        </Button>

        <input
          className="focus: border-2 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 outline-none"
          onChange={(e) => setNsec(e.target.value)}
          placeholder="Enter your nsec"
          type="password"
        />
      </div>
    </Layout>
  )
}

export default SignIn
