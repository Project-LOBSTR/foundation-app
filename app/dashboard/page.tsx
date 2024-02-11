'use client'
// TODO: this page is redundant

import { useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { npubEncode } from 'nostr-tools/nip19'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import LobstrLogo from '@/components/LobstrLogo'
import { logout } from '@/redux/features/user'
import { useAppSelector } from '@/redux/store'

const Dashboard = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const userNpub = useAppSelector(({ user }) => user.publickey)
  const npub = npubEncode(userNpub)

  const signOut = useCallback(() => {
    dispatch(logout())
    router.push('/')
  }, [dispatch, router])

  return (
    <Layout canGoBack={false}>
      <div className="flex flex-col w-full h-full py-10 items-center ">
        <LobstrLogo size={200} />
      </div>
      <div className="text-black max-w-sm text-xs flex self-center">{npub}</div>
      <div className="item-center flex flex-col gap-2 align-middle w-full px-10">
        <Button onClick={signOut} variant="primary">
          Logout
        </Button>
      </div>
    </Layout>
  )
}

export default Dashboard
