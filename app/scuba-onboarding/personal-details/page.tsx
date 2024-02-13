'use client'
import { useCallback } from 'react'

import { NDKEvent } from '@nostr-dev-kit/ndk'
import { FieldValues, useForm } from 'react-hook-form'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'

const PersonalDetails = () => {
  const { handleSubmit, register } = useForm<FieldValues>()

  const onSubmit = useCallback((data: FieldValues) => {
    console.log(data)

    new NDKEvent({
      kind: 0, // metadata
    })
  }, [])

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

        <Button variant="primary" onSubmit={handleSubmit(onSubmit)}>
          Continue
        </Button>
      </div>
    </Layout>
  )
}

export default PersonalDetails
