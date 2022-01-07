import React from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'

export default function HeaderDashboard() {
  return (
    <div>
      <h1>HeaderDashboard</h1>
      <Image
        src="/assets/logo.png"
        alt="Logo Me Conta"
        width={168}
        height={56}
      />
    </div>
  )
}
