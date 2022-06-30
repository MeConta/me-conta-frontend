/* eslint-disable @next/next/no-img-element */
import React from 'react'

type MockImageProps = {
  src: string
  alt: string
}

const image = ({ alt, src }: MockImageProps) => {
  return <img alt={alt} src={src} />
}

export default image
