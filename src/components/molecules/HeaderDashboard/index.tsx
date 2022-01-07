import React from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'

export type HeaderDashboardProps = {
  logoSrc?: string | StaticImageData
}

export default function HeaderDashboard({
  logoSrc = Logo
}: HeaderDashboardProps) {
  return (
    <div>
      <Image
        unoptimized={true}
        src={logoSrc}
        alt="Logo Me Conta"
        width={168}
        height={56}
      />
    </div>
  )
}
