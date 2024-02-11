import Image from 'next/image'

type Props = { size: number }

const LobstrLogo = ({ size }: Props) => {
  return (
    <div>
      <Image
        src={'/lobstr-logo.png'}
        alt="Lobstrrr"
        width={size}
        height={size}
        priority
        className="mx-auto mt-8 mb-4"
      />
    </div>
  )
}

export default LobstrLogo
