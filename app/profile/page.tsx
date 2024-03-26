'use client'
import { useCallback, useEffect } from 'react'

import { Button } from '@lobstr/react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'

import { routes } from '@/constants/routes'
import { logout } from '@/redux/features/user'
import { useAppSelector } from '@/redux/store'

const Profile = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const pubKey = useAppSelector(({ user }) => user.publickey)

  const signOut = useCallback(() => {
    dispatch(logout())
    router.replace('/')
  }, [dispatch, router])

  useEffect(() => {
    if (!pubKey) router.replace('/')
  }, [pubKey, router])

  return (
    <div>
      <h1>Profile</h1>
      <Button.Root onClick={() => router.push(routes.scubaOnboarding)}>
        Go to Scuba Onboarding
      </Button.Root>
      <Button.Root onClick={signOut}>Logout</Button.Root>
    </div>
  )
}

export default Profile
