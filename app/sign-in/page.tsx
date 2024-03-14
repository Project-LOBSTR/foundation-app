'use client'

import { useCallback, useMemo, useState } from 'react'

import { bytesToHex } from '@noble/hashes/utils'
import NDK, { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { nip19 } from 'nostr-tools'
import { FaFileSignature } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { relays } from '@/constants/nostr'
import { routes } from '@/constants/routes'
import { login } from '@/redux/features/user'

const SignIn = () => {
  const [nsec, setNsec] = useState<string | undefined>(undefined)

  const router = useRouter()
  const dispatch = useDispatch()

  const ndk = useMemo(() => new NDK({ explicitRelayUrls: relays }), [])

  const newLogin = useCallback(async () => {
    const signer = !nsec
      ? new NDKNip07Signer()
      : new NDKPrivateKeySigner(nip19.decode(nsec)?.data as string)

    ndk.signer = signer

    const user = await signer.user()

    if (user.pubkey) {
      dispatch(
        login({
          publickey: user.pubkey,
          privatekey:
            nsec && bytesToHex(nip19.decode(nsec)?.data as Uint8Array),
        }),
      )
      // TODO: depends if they've onboarded on lobstr already
      router.push(routes.chooseAppMode)
    }
  }, [dispatch, ndk, nsec, router])

  const isPWA = useMemo(
    () => window.matchMedia('(display-mode: standalone)').matches,
    [],
  )

  return (
    <Layout logoSize={300}>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-10">
          Login to LOBSTR
        </h1>
        {/** TODO: fixed width */}
        {!isPWA && (
          <div
            className="flex flex-row gap-2 bg-gradient-lobstr p-2 rounded-md w-40"
            onClick={newLogin}
          >
            <FaFileSignature color="#3A167F" />
            <p className="text-black font-semibold text-xs">Use NOSTR signer</p>
          </div>
        )}

        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          onChange={(e) => setNsec(e.target.value)}
          placeholder="Enter your nsec"
          type="password"
        />
        {nsec?.length && (
          <Button variant="primary" onClick={newLogin}>
            Use with nsec
          </Button>
        )}
        <div
          className="py-2"
          onClick={() => router.push(routes.recoverSeedPhrase)}
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
