/* eslint-disable @next/next/no-img-element */
import React from 'react'

type MockImageProps = {
  src: string
  alt: string
}

const nextImageMock = ({ alt }: MockImageProps) => {
  return <img alt={alt} />
}

export default nextImageMock
