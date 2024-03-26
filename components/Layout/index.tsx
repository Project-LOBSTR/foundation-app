import { PropsWithChildren, useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

import LobstrLogo from '../LobstrLogo'

type Props = {
  canGoBack?: boolean
  logoSize?: number
}

const Layout = ({
  children,
  logoSize,
  canGoBack = true,
}: PropsWithChildren<Props>) => {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <main className="flex max-h-screen max-w-2xl w-full h-full flex-col bg-white">
      {canGoBack && (
        <div className="p-2" onClick={goBack}>
          <IoIosArrowBack className="text-black" />
        </div>
      )}
      {logoSize && (
        <div className="flex flex-col w-full h-full py-8 items-center ">
          <LobstrLogo size={logoSize} />
        </div>
      )}
      {children}
    </main>
  )
}

export default Layout
