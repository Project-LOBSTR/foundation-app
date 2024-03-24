'use client'

import { useCallback, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, TextInput, Text } from '@lobstr/react'
import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Layout from '@/components/Layout'
import { AppSpecificTags } from '@/constants/nostr'
import { routes } from '@/constants/routes'
import { useNostr } from '@/hooks/useNostr'
import { useAppSelector } from '@/redux/store'

const personalDetailsSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

type PersonalDetailsSchema = z.infer<typeof personalDetailsSchema>

const PersonalDetails = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<PersonalDetailsSchema>({
    resolver: zodResolver(personalDetailsSchema),
  })

  const router = useRouter()

  const { publickey } = useAppSelector(({ user }) => user)
  const { ndk } = useNostr()

  const onSubmit = useCallback(
    async ({ firstName, lastName }: PersonalDetailsSchema) => {
      const event = new NDKEvent(ndk, {
        kind: NDKKind.AppSpecificData,
        created_at: Math.floor(new Date().getTime() / 1000),
        content: JSON.stringify({
          firstName,
          lastName,
        }),
        pubkey: publickey,
        tags: [['d', AppSpecificTags.PersonalDetails]],
      })

      await event.publish()

      router.push(routes.profile)
    },
    [ndk, publickey, router],
  )

  useEffect(() => {
    async function fetchEvents() {
      const userEvents = await ndk.fetchEvents({ authors: [publickey] })

      let isLobstrOnboarded = false

      userEvents.forEach((event) => {
        const hasTag = event.tags
          .map((tag) => {
            return tag.includes(AppSpecificTags.PersonalDetails)
          })
          .includes(true)

        if (hasTag) isLobstrOnboarded = true
      })

      if (isLobstrOnboarded) router.push(routes.profile)
    }

    fetchEvents()
  }, [ndk, publickey, router])

  return (
    <Layout logoSize={200} canGoBack={false}>
      <div className="item-center flex flex-col gap-4 align-middle w-full px-10">
        <Heading className="font-semibold text-center font-heading text-primary-500 text-2xl mb-4">
          Personal details
        </Heading>
        <TextInput.Root size="sm" className="w-full">
          <TextInput.Control
            placeholder="First Name"
            {...register('firstName')}
          />
        </TextInput.Root>
        {errors.firstName && (
          <Text className="text-red-500" size="sm">
            {errors.firstName.message}
          </Text>
        )}

        <TextInput.Root size="sm" className="w-full">
          <TextInput.Control
            placeholder="Last Name"
            {...register('lastName')}
          />
        </TextInput.Root>
        {errors.lastName && (
          <Text className="text-red-500" size="sm">
            {errors.lastName.message}
          </Text>
        )}

        <Button.Root
          className="w-full justify-center"
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

export default PersonalDetails
