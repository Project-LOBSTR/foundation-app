import { useMemo } from 'react'

import NDK, { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk'

import { relays } from '@/constants/nostr'
import { useAppSelector } from '@/redux/store'

export const useNostr = () => {
  const { privatekey } = useAppSelector(({ user }) => user)

  const ndk = useMemo(
    () =>
      new NDK({
        explicitRelayUrls: relays,
      }),
    [],
  )

  ndk.connect()

  const nip07signer = useMemo(() => new NDKNip07Signer(), [])
  const signer = useMemo(
    () => new NDKPrivateKeySigner(privatekey),
    [privatekey],
  )

  ndk.signer = privatekey ? signer : nip07signer

  return {
    ndk,
  }
}
