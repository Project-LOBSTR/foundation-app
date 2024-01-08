'use client'

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { npubEncode } from 'nostr-tools/nip19'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { logout } from '@/redux/features/user'
import { useAppSelector } from '@/redux/store'

const Dashboard = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const userNpub = useAppSelector(({ user }) => user.publickey)
  const nsec = npubEncode(userNpub)

  const signOut = useCallback(() => {
    dispatch(logout())
    router.push('/')
  }, [dispatch, router])

  return (
    <Layout heading="Dashboard">
      <div className="text-black max-w-sm text-xs">{nsec}</div>
      <Button onClick={signOut} variant="primary">
        Logout
      </Button>
    </Layout>
  )
}

export default Dashboard
