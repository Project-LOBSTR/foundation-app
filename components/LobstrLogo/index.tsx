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
      />
    </div>
  )
}

export default LobstrLogo
