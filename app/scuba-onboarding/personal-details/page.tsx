'use client'

import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, TextInput, Text } from '@lobstr/react'
import { NDKEvent, NDKKind } from '@nostr-dev-kit/ndk'
import * as Switch from '@radix-ui/react-switch'
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
  // TODO: validate age
  dateOfBirth: z.string().default(new Date().toISOString().split('T')[0]),
  numberOfDives: z.string().optional(),
  certificationLevel: z.string().optional(),
})

type PersonalDetailsSchema = z.infer<typeof personalDetailsSchema>

const PersonalDetails = () => {
  const [hasExperience, setHasExperience] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<PersonalDetailsSchema>({
    resolver: zodResolver(personalDetailsSchema),
  })

  console.log(isValid)
  const router = useRouter()

  const { publickey } = useAppSelector(({ user }) => user)
  const { ndk } = useNostr()

  const onSubmit = useCallback(
    async ({
      firstName,
      lastName,
      dateOfBirth,
      certificationLevel,
      numberOfDives,
    }: PersonalDetailsSchema) => {
      const event = new NDKEvent(ndk, {
        kind: NDKKind.AppSpecificData,
        created_at: Math.floor(new Date().getTime() / 1000),
        content: JSON.stringify({
          firstName,
          lastName,
          dateOfBirth,
          certificationLevel: hasExperience ? certificationLevel : 0,
          numberOfDives: hasExperience ? numberOfDives : 0,
        }),
        pubkey: publickey,
        tags: [['d', AppSpecificTags.PersonalDetails]],
      })

      await event.publish()

      router.push(routes.scubaOnboarding.emergencyContact)
    },
    [hasExperience, ndk, publickey, router],
  )

  return (
    <Layout logoSize={200}>
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
        <TextInput.Root size="sm" className="w-full">
          <TextInput.Control
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            {...register('dateOfBirth')}
          />
        </TextInput.Root>
        {errors.dateOfBirth && (
          <Text className="text-red-500" size="sm">
            {errors.dateOfBirth.message}
          </Text>
        )}
        <div className="flex flex-row gap-2 items-center">
          <Switch.Root
            onCheckedChange={(checked) => setHasExperience(checked)}
            className='flex flex-row items-center h-6 w-11 rounded-xl p-0.5 data-[state="checked"]:justify-end data-[disabled]:bg-gray-400 data-[state="checked"]:bg-primary-500 data-[state="unchecked"]:bg-gray-200'
          >
            <Switch.Thumb className="rounded-xl bg-white drop-shadow-sm data-[disabled]:bg-neutral-20 h-5 w-5" />
          </Switch.Root>
          <Text className="text-black" size="sm">
            Do you have any previous diving experience?
          </Text>
        </div>
        {hasExperience && (
          <div className=" flex flex-row gap-2  w-full">
            <TextInput.Root size="sm" className="w-full">
              <TextInput.Control
                placeholder="Number of dives"
                {...register('numberOfDives')}
              />
            </TextInput.Root>
            <TextInput.Root size="sm" className="w-full">
              <TextInput.Control
                placeholder="Certification Level"
                {...register('certificationLevel')}
              />
            </TextInput.Root>
          </div>
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
