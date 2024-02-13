'use client'
import { hexToBytes } from '@noble/hashes/utils'
import { useRouter } from 'next/navigation'
import { getPublicKey } from 'nostr-tools'
import { privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { FieldValues, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { login } from '@/redux/features/user'

const RecoverSeedPhrase = () => {
  const { handleSubmit, register } = useForm<FieldValues>()

  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = (data: FieldValues) => {
    const seedPhrase = Object.keys(data)
      .map((item) => item)
      .join(' ')

    const recoveredSecret = privateKeyFromSeedWords(seedPhrase)

    const encodedSecret = hexToBytes(recoveredSecret)

    const pubKey = getPublicKey(encodedSecret)

    if (!pubKey) return

    dispatch(login({ publickey: pubKey, privatekey: encodedSecret }))
    router.push('/dashboard')
  }

  return (
    <Layout canGoBack>
      <div className="flex flex-col w-full h-full py-10 items-center gap-6 px-6">
        <LobstrLogo size={200} />

        <h1 className="text-primary-500">Enter your Seed Phrase</h1>
        <div className="grid grid-cols-2 grid-rows-6 self-center gap-6 content-between">
          {Array.from({ length: 12 }, (_, i) => {
            return (
              <input
                key={i}
                className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
                placeholder={`${i + 1}.`}
                {...register(`seed-${i + 1}`)}
              />
            )
          })}
        </div>
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Recover account
        </Button>
      </div>
    </Layout>
  )
}

export default RecoverSeedPhrase
