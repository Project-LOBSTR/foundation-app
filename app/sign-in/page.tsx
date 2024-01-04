'use client'

import { useCallback, useState } from 'react'

import { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { nip19 } from 'nostr-tools'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'

const SignIn = () => {
  const [nsec, setNsec] = useState<string | undefined>(undefined)
  const [showNsecEntry, setShowNsecEntry] = useState<boolean>(false)

  const router = useRouter()

  const loginWithPrivKey = useCallback(async () => {
    if (!nsec) return

    const privatekey = nip19.decode(nsec)

    if (!privatekey?.data) return

    const privKeySigner = new NDKPrivateKeySigner(privatekey.data as string)

    const user = await privKeySigner.user()

    if (user.pubkey) {
      console.log(user)
      router.push('/dashboard')
    }
  }, [nsec, router])

  const loginWithSigner = useCallback(async () => {
    const nip07signer = new NDKNip07Signer()

    const user = await nip07signer.user()

    if (user.pubkey) {
      console.log(user)
      router.push('/dashboard')
    }
  }, [router])

  return (
    <Layout heading="Login to LOBSTR">
      <div className="item-center flex flex-col gap-2 align-middle">
        <Button
          className="rounded-sm bg-primary-600 px-12 py-4 text-sm text-white"
          onClick={loginWithSigner}
        >
          Use NOSTR signer
        </Button>
        <Button
          className="rounded-sm bg-primary-600 px-12 py-4 text-sm text-white"
          onClick={() => setShowNsecEntry((prev: boolean) => !prev)}
        >
          Use with nsec
        </Button>
        {showNsecEntry && (
          <div className="flex flex-row gap-2">
            <input
              className="focus: border-2 border-detail px-2 text-black placeholder-detail outline-none"
              onChange={(e) => setNsec(e.target.value)}
              placeholder="Enter your nsec"
            />
            <Button
              className="rounded-sm bg-secondary  text-sm text-white"
              onClick={loginWithPrivKey}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SignIn
