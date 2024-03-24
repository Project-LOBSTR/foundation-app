'use client'
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useAppSelector } from '@/redux/store'

const Profile = () => {
  const router = useRouter()
  const pubKey = useAppSelector(({ user }) => user.publickey)

  useEffect(() => {
    if (!pubKey) router.replace('/')
  }, [pubKey, router])

  return (
    <div>
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
