'use client'
import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Heading, Button, Text, TextInput } from '@lobstr/react'
import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { AppSpecificTags } from '@/constants/nostr'
import { useNostr } from '@/hooks/useNostr'
import { useAppSelector } from '@/redux/store'

const emergencyContactSchema = z.object({
  name: z.string().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().email(),
})

type EmergencyContactSchema = z.infer<typeof emergencyContactSchema>

const EmergencyContact = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<EmergencyContactSchema>({
    resolver: zodResolver(emergencyContactSchema),
  })

  const { publickey } = useAppSelector(({ user }) => user)
  const { ndk } = useNostr()

  const onSubmit = useCallback(
    async ({ name, phoneNumber, email }: EmergencyContactSchema) => {
      const event = new NDKEvent(ndk, {
        kind: NDKKind.AppSpecificData,
        created_at: Math.floor(new Date().getTime() / 1000),
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
    },
    [ndk, publickey],
  )

  return (
    <Layout logoSize={200}>
      <div className="item-center flex flex-col gap-4 align-middle w-full px-10">
        <Heading className=" text-2xl font-semibold text-center font-heading text-primary-500 mb-2">
          Emergency contact
        </Heading>
        <TextInput.Root
          className="focus: outline-none h-12 px-2 text-black rounded-xl placeholder-primary-500"
          size="sm"
        >
          <TextInput.Control
            placeholder="Name"
            {...register('name')}
          ></TextInput.Control>
        </TextInput.Root>
        {errors.name && (
          <Text className="text-red-500" size="sm">
            {errors.name.message}
          </Text>
        )}
        <TextInput.Root
          className="focus: outline-none  h-12 px-2 text-black rounded-xl  placeholder-primary-500"
          size="sm"
        >
          <TextInput.Control
            placeholder="Phone number"
            {...register('phoneNumber')}
          />
        </TextInput.Root>
        {errors.phoneNumber && (
          <Text className="text-red-500" size="sm">
            {errors.phoneNumber.message}
          </Text>
        )}
        <TextInput.Root
          className="focus: outline-none  h-12 px-2 text-black rounded-xl placeholder-primary-500"
          size="sm"
        >
          <TextInput.Control
            type="email"
            placeholder="Email"
            {...register('email')}
          />
        </TextInput.Root>
        {errors.email && (
          <Text className="text-red-500" size="sm">
            {errors.email.message}
          </Text>
        )}
        <Button.Root
          size="md"
          variant="primary"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        >
          Continue
        </Button.Root>
      </div>
    </Layout>
  )
}

export default EmergencyContact
