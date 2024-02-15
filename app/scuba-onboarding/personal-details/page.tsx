'use client'

import { useCallback, useEffect, useMemo } from 'react'

import NDK, { NDKEvent, NDKKind, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'
import { FieldValues, useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { useAppSelector } from '@/redux/store'

const PersonalDetails = () => {
  const { publickey, privatekey } = useAppSelector(({ user }) => {
    return {
      publickey: user.publickey,
      privatekey: user.privatekey,
    }
  })
  const { handleSubmit, register } = useForm<FieldValues>()

  const ndk = useMemo(
    () => new NDK({ explicitRelayUrls: ['wss://relay.primal.net'] }),
    [],
  )

  ndk.connect()
  const signer = new NDKPrivateKeySigner(privatekey)
  ndk.signer = signer

  const onSubmit = useCallback(
    async ({ firstName, lastName, dateOfBirth }: FieldValues) => {
      const event = new NDKEvent(ndk, {
        kind: NDKKind.Metadata,
        created_at: Math.floor(new Date().getTime() / 1000),
        content: JSON.stringify({
          firstName,
          lastName,
          dateOfBirth,
        }),
        pubkey: publickey,
        tags: [],
      })

      await event.publish()

      const events = await ndk.fetchEvents({ authors: [publickey] })

      console.log(events)
    },
    [ndk, publickey],
  )

  const fetchEvents = useCallback(async () => {
    const events = await ndk.fetchEvents({ authors: [publickey] })
    return events
  }, [ndk, publickey])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents, ndk, publickey])

  return (
    <Layout>
      <div className="flex flex-col w-full h-full py-8 items-center ">
        <LobstrLogo size={200} />
      </div>
      <div className="item-center flex flex-col gap-4 align-middle w-full px-10">
        <h1 className="text-2xl  font-semibold text-center font-heading text-primary-500 mb-2">
          Personal details
        </h1>
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          placeholder="First Name"
          {...register('firstName')}
        />
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500 "
          placeholder="Last Name"
          {...register('lastName')}
        />
        <input
          className="focus: outline-none bg-gray-100 h-12 px-2 text-black rounded-xl text-sm placeholder-primary-500"
          type="date"
          {...register('dateOfBirth')}
        />

        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
    </Layout>
  )
}

export default PersonalDetails
