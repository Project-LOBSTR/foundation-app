'use client'

import { useCallback } from 'react'

import NDK, { NDKNip07Signer } from '@nostr-dev-kit/ndk'
import * as Toast from '@radix-ui/react-toast'
import { useRouter } from 'next/navigation'

import Layout from '@/components/Layout'

const SignIn = () => {
  const router = useRouter()

  const login = useCallback(async () => {
    const nip07signer = new NDKNip07Signer()
    const ndk = new NDK({
      explicitRelayUrls: ['wss://relay.primal.net'],
      signer: nip07signer,
    })

    await ndk.connect()

    const user = await nip07signer.user()

    if (user.pubkey) {
      console.log(ndk.activeUser)
      router.push('/dashboard')
    }
  }, [router])

  return (
    <Layout heading="Login to LOBSTR">
      <button
        className="bg-primary rounded-sm px-12 py-4 text-sm text-white"
        onClick={login}
      >
        Use NOSTR signer
      </button>
    </Layout>
  )
}

export default SignIn
