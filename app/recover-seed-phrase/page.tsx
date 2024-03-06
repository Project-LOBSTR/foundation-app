'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { hexToBytes } from '@noble/hashes/utils'
import { useRouter } from 'next/navigation'
import { getPublicKey } from 'nostr-tools'
import { privateKeyFromSeedWords } from 'nostr-tools/nip06'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { z } from 'zod'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { routes } from '@/constants/routes'
import { login } from '@/redux/features/user'

const recoverPhraseSchema = z
  .object({
    'seed-1': z.string().min(1),
    'seed-2': z.string().min(1),
    'seed-3': z.string().min(1),
    'seed-4': z.string().min(1),
    'seed-5': z.string().min(1),
    'seed-6': z.string().min(1),
    'seed-7': z.string().min(1),
    'seed-8': z.string().min(1),
    'seed-9': z.string().min(1),
    'seed-10': z.string().min(1),
    'seed-11': z.string().min(1),
    'seed-12': z.string().min(1),
  })
  .required()

type RecoverPhraseSchema = z.infer<typeof recoverPhraseSchema>

const RecoverSeedPhrase = () => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<RecoverPhraseSchema>({
    resolver: zodResolver(recoverPhraseSchema),
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const onSubmit = (data: RecoverPhraseSchema) => {
    const seedPhrase = Object.keys(data)
      .map((item) => item)
      .join(' ')

    const recoveredSecret = privateKeyFromSeedWords(seedPhrase)

    const encodedSecret = hexToBytes(recoveredSecret)

    const pubKey = getPublicKey(encodedSecret)

    if (!pubKey) return

    dispatch(login({ publickey: pubKey, privatekey: recoveredSecret }))
    // TODO: check is user has onboarded
    router.push(routes.chooseAppMode)
  }

  return (
    <Layout canGoBack logoSize={200}>
      <div className="flex flex-col w-full h-full items-center gap-6 px-6">
        <h1 className="text-primary-500">Enter your Seed Phrase</h1>
        <div className="grid grid-cols-2 grid-rows-6 self-center gap-4 content-between">
          {Array.from({ length: 12 }, (_, i) => {
            return (
              <input
                key={i}
                className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
                placeholder={`${i + 1}.`}
                {...register(`seed-${i + 1}` as keyof RecoverPhraseSchema)}
              />
            )
          })}
        </div>
        <Button
          variant="primary"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Recover account
        </Button>
      </div>
    </Layout>
  )
}

export default RecoverSeedPhrase
