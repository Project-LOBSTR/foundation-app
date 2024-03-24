'use client'

import { useCallback, useMemo, useState } from 'react'

import { Heading, TextInput, Button, Text } from '@lobstr/react'
import { bytesToHex } from '@noble/hashes/utils'
import NDK, { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { nip19 } from 'nostr-tools'
import { FaFileSignature } from 'react-icons/fa'
import { useDispatch } from 'react-redux'

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
      router.push(routes.personalDetails)
    }
  }, [dispatch, ndk, nsec, router])

  const isPWA = useMemo(
    () => window.matchMedia('(display-mode: standalone)').matches,
    [],
  )

  return (
    <Layout logoSize={300}>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <Heading className="text-center" size="h4">
          Login to LOBSTR
        </Heading>
        {/** TODO: fixed width */}
        {!isPWA && (
          <div
            className="flex flex-row gap-2 bg-gradient-lobstr p-2 rounded-md w-40"
            onClick={newLogin}
          >
            <FaFileSignature color="#3A167F" />
            <TextInput.Root
              className="text-black font-semibold w-full"
              size="sm"
            >
              Use NOSTR signer
            </TextInput.Root>
          </div>
        )}

        <TextInput.Root size="sm" className="w-full">
          <TextInput.Control
            onChange={(e) => setNsec(e.target.value)}
            placeholder="Enter your nsec"
            type="password"
          />
        </TextInput.Root>
        {nsec?.length && (
          <Button.Root
            className="w-full justify-center"
            size="md"
            variant="primary"
            onClick={newLogin}
          >
            Use with nsec
          </Button.Root>
        )}
        <div
          className="py-2"
          onClick={() => router.push(routes.recoverSeedPhrase)}
        >
          <Text className="text-primary-500" size="sm">
            Recover account with seed phrase
          </Text>
        </div>
      </div>
    </Layout>
  )
}

export default SignIn
