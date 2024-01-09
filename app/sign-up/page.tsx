'use client'
import { useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { generateSecretKey, getPublicKey } from 'nostr-tools'
// import { npubEncode, nsecEncode } from 'nostr-tools/nip19'
import { useDispatch } from 'react-redux'

import { Button } from '@/components/Button'
import Layout from '@/components/Layout'
import { login } from '@/redux/features/user'

const SignUp = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const generateNostrKeys = useCallback(() => {
    const secret = generateSecretKey()
    const pubKey = getPublicKey(secret)

    // TODO: show the use to copy down secret

    // const nsec = nsecEncode(secret)
    // const npub = npubEncode(pubKey)

    dispatch(login(pubKey))
    router.push('/dashboard')
  }, [dispatch, router])

  return (
    <Layout heading="Sign up">
      <Button variant="primary" onClick={generateNostrKeys}>
        Create NOSTR account
      </Button>
    </Layout>
  )
}

export default SignUp
