import { PropsWithChildren, useCallback } from 'react'

import { useRouter } from 'next/navigation'
import { IoIosArrowBack } from 'react-icons/io'

type Props = {
  canGoBack?: boolean
}

const Layout = ({ children, canGoBack = true }: PropsWithChildren<Props>) => {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return (
    <main className="flex min-h-screen h-full flex-col bg-white ">
      {canGoBack && (
        <div className="p-2" onClick={goBack}>
          <IoIosArrowBack className="text-black" />
        </div>
      )}
      {children}
    </main>
  )
}

export default Layout
