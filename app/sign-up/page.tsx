'use client'

import { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Heading, TextInput, Button, Text } from '@lobstr/react'
import { hexToBytes } from '@noble/hashes/utils'
import NDK, { NDKEvent, NDKKind, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { getPublicKey } from 'nostr-tools'
import { generateSeedWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { relays } from '@/constants/nostr'
import { routes } from '@/constants/routes'
import { login } from '@/redux/features/user'

const signUpSchema = z
  .object({
    name: z.string().min(1),
  })
  .required()

type SignUpSchema = z.infer<typeof signUpSchema>

const SignUp = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })
  const dispatch = useDispatch()
  const router = useRouter()

  const [mnenonomic, setMnenonomic] = useState<string | null>(null)

  const ndk = useMemo(
    () =>
      new NDK({
        explicitRelayUrls: relays,
      }),
    [],
  )

  ndk.connect()

  const generateNostrKeys = useCallback(
    async (data: SignUpSchema) => {
      const seedPhrase = generateSeedWords()

      const secret = privateKeyFromSeedWords(seedPhrase)
      const encodedSecret = hexToBytes(secret)

      const pubKey = getPublicKey(encodedSecret)

      const signer = new NDKPrivateKeySigner(secret)

      ndk.signer = signer

      const event = new NDKEvent(ndk, {
        kind: NDKKind.Metadata,
        created_at: Math.floor(new Date().getTime() / 1000),
        content: JSON.stringify({
          name: data.name,
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

  if (mnenonomic)
    return (
      <Layout logoSize={200}>
        <div className="item-center flex flex-col gap-10 align-middle w-full px-10">
          <Heading className="font-semibold text-center font-heading" size="h3">
            Write down your seed phrase somewhere safe
          </Heading>

          <div className="flex flex-row flex-wrap gap-2 justify-center">
            {seedPhraseSplit?.map((word, index) => {
              return (
                <Text
                  className="text-black bg-gray-200 px-3 rounded"
                  size="sm"
                  key={index}
                >
                  {transformCaption(word, index)}
                </Text>
              )
            })}
          </div>
          <Button.Root
            data-cy="seed-phrase-continue-button"
            className="w-full justify-center"
            size="md"
            variant="primary"
            onClick={() => router.push(routes.personalDetails)}
          >
            Continue
          </Button.Root>
        </div>
      </Layout>
    )

  return (
    <Layout logoSize={200}>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <Heading size="h4" className="text-center">
          Create new account
        </Heading>
        <TextInput.Root size="md" className="w-full">
          <TextInput.Control
            data-cy="username-input"
            placeholder="Username"
            {...register('name')}
          />
        </TextInput.Root>
        {errors.name && (
          <Text className="text-red-500" size="sm">
            {errors.name.message}
          </Text>
        )}
        <Button.Root
          data-cy="create-nostr-account-button"
          className="w-full justify-center"
          size="md"
          variant="primary"
          onClick={handleSubmit(generateNostrKeys)}
        >
          Create NOSTR account
        </Button.Root>
      </div>
    </Layout>
  )
}

export default SignUp
