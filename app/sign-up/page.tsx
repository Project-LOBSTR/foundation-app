'use client'

import { useCallback, useEffect, useState } from 'react'

import { hexToBytes } from '@noble/hashes/utils'
import { useRouter } from 'next/navigation'
import { getPublicKey } from 'nostr-tools'
import { generateSeedWords, privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { login } from '@/redux/features/user'
import { useAppSelector } from '@/redux/store'

type Keys = {
  nsec: string
  npub: string
  seedPhrase: string
}

const SignUp = () => {
  const [keys, setKeys] = useState<Keys | null>(null)

  const userNpub = useAppSelector(({ user }) => user.publickey)

  const dispatch = useDispatch()
  const router = useRouter()

  const generateNostrKeys = useCallback(() => {
    const seedPhrase = generateSeedWords()

    const secret = privateKeyFromSeedWords(seedPhrase)
    const encodedSecret = hexToBytes(secret)

    const pubKey = getPublicKey(encodedSecret)

    const nsec = nsecEncode(encodedSecret)
    const npub = npubEncode(pubKey)

    setKeys({ nsec, npub, seedPhrase })
    dispatch(login(pubKey))
  }, [dispatch])

  const seedPhraseSplit = keys?.seedPhrase.split(' ')
  const transformCaption = (word: string, index: number) => {
    return `${index + 1}. ${word}`
  }

  useEffect(() => {
    if (userNpub) router.push('/choose-app-mode')
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
          <Button
            variant="primary"
            onClick={() => router.push('/choose-app-mode')}
          >
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
