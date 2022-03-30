import React from 'react'
import Facebook from '../../../../public/assets/footer/Facebook.svg'
import Instagram from '../../../../public/assets/footer/Instagram.svg'
import Linkedin from '../../../../public/assets/footer/Linkedin.svg'
import Image from 'next/image'
import { FooterWrapper } from './styles'

type FooterProps = {
  logoFacebook?: string | StaticImageData
  logoInstagram?: string | StaticImageData
  logoLinkedin?: string | StaticImageData
}

export default function Footer({
  logoFacebook = Facebook,
  logoInstagram = Instagram,
  logoLinkedin = Linkedin
}: FooterProps) {
  return (
    <FooterWrapper>
      <h1>Me Conta?</h1>
      <div className="description">
        <p>
          O Me Conta? é um projeto social sem fins lucrativos. Quer apoiar nossa
          ideia?
        </p>
        <p>Envie-nos um email para central@meconta.org</p>
      </div>
      <div className="socials-group">
        <a
          href="https://www.facebook.com/orgmeconta-106817581465445"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={logoFacebook}
            alt="Me Conta Facebook"
            width={25}
            height={25}
          />
        </a>
        <a
          href="https://www.linkedin.com/company/movimento-me-conta"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={logoLinkedin}
            alt="Me Conta Linkedin"
            width={25}
            height={25}
          />
        </a>
        <a
          href="https://instagram.com/org.meconta?igshid=j482j9nbx3sz"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={logoInstagram}
            alt="Me Conta Instagram"
            width={25}
            height={25}
          />
        </a>
      </div>
    </FooterWrapper>
  )
}
