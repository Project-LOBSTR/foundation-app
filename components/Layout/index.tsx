import { PropsWithChildren } from 'react'

import Image from 'next/image'

type Props = {
  heading?: string
}

const Layout = ({ heading, children }: PropsWithChildren<Props>) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white p-12">
      <div className="flex flex-col items-center">
        <Image
          src={'/lobstr-logo.png'}
          alt="Lobstrrr"
          width={500}
          height={500}
          priority
        />
        {heading && (
          <h1 className="font-heading text-xl text-primary-500">{heading}</h1>
        )}
      </div>
      {children}
    </main>
  )
}

export default Layout
