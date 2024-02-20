'use client'

import { useCallback, useMemo, useState } from 'react'

import { hexToBytes } from '@noble/hashes/utils'
import NDK, { NDKEvent, NDKKind, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { getPublicKey } from 'nostr-tools'
import { generateSeedWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { FieldValues, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { relays } from '@/constants/nostr'
import { routes } from '@/constants/routes'
import { login } from '@/redux/features/user'

const SignUp = () => {
  const { handleSubmit, register } = useForm<FieldValues>()
  const dispatch = useDispatch()
  const router = useRouter()

  const [mnenonomic, setMnenonomic] = useState<string | null>(null)

  const ndk = useMemo(() => new NDK({ explicitRelayUrls: relays }), [])

  ndk.connect()

  const generateNostrKeys = useCallback(
    async (data: FieldValues) => {
      const seedPhrase = generateSeedWords()

      const secret = privateKeyFromSeedWords(seedPhrase)
      const encodedSecret = hexToBytes(secret)

      const pubKey = getPublicKey(encodedSecret)

      const signer = new NDKPrivateKeySigner(secret)

      ndk.signer = signer

      const event = new NDKEvent(ndk, {
        kind: NDKKind.Metadata,
        created_at: Date.now(),
        content: JSON.stringify({
          name: data.name,
          nip05: data.email,
        }),
        pubkey: pubKey,
        tags: [],
      })

      await event.publish()

      setMnenonomic(seedPhrase)
      dispatch(login({ publickey: pubKey, privatekey: secret }))
    },
    [dispatch, ndk],
  )

  const seedPhraseSplit = mnenonomic?.split(' ')
  const transformCaption = (word: string, index: number) => {
    return `${index + 1}. ${word}`
  }

  const navigateToChooseAppMode = useCallback(() => {
    router.push(routes.chooseAppMode)
  }, [router])

  if (mnenonomic)
    return (
      <Layout logoSize={200}>
        <div className="item-center flex flex-col gap-10 align-middle w-full px-10">
          <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500">
            Write down your seed phrase somewhere safe
          </h1>

          <div className="flex flex-row flex-wrap gap-2 justify-center">
            {seedPhraseSplit?.map((word, index) => {
              return (
                <p
                  className="text-black bg-gray-200 px-3 rounded-sm"
                  key={index}
                >
                  {transformCaption(word, index)}
                </p>
              )
            })}
          </div>
          <Button variant="primary" onClick={navigateToChooseAppMode}>
            Continue
          </Button>
        </div>
      </Layout>
    )

  return (
    <Layout logoSize={200}>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-10">
          Create new account
        </h1>
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          placeholder="Name"
          {...register('name')}
        />
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          placeholder="Email address"
          {...register('email')}
        />
        <Button variant="primary" onClick={handleSubmit(generateNostrKeys)}>
          Create NOSTR account
        </Button>
      </div>
    </Layout>
  )
}

export default SignUp
