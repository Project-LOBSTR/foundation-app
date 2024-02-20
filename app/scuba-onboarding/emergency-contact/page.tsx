'use client'
import { useCallback } from 'react'

import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { AppSpecificTags } from '@/constants/nostr'
import { routes } from '@/constants/routes'
import { useNostr } from '@/hooks/useNostr'
import { useAppSelector } from '@/redux/store'

const EmergencyContact = () => {
  const { register, handleSubmit } = useForm<FieldValues>()

  const router = useRouter()
  const { publickey } = useAppSelector(({ user }) => user)
  const { ndk } = useNostr()

  const onSubmit = useCallback(
    async ({ name, phoneNumber, email }: FieldValues) => {
      const event = new NDKEvent(ndk, {
        kind: NDKKind.AppSpecificData,
        created_at: Date.now(),
        content: JSON.stringify({
          emergencyContact: {
            name,
            phoneNumber,
            email,
          },
        }),
        pubkey: publickey,
        tags: [['d', AppSpecificTags.EmergencyContact]],
      })

      await event.publish()

      router.push(routes.scubaOnboarding.divingExperience)
    },
    [ndk, publickey, router],
  )

  return (
    <Layout logoSize={200}>
      <div className="item-center flex flex-col gap-4 align-middle w-full px-10">
        <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-2">
          Emergency contact
        </h1>
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          placeholder="Name"
          {...register('name')}
        />
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          placeholder="Phone number"
          {...register('phoneNumber')}
        />
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500"
          type="email"
          placeholder="Email"
          {...register('email')}
        />

        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
    </Layout>
  )
}

export default EmergencyContact
