import * as S from './styles'
import Image from 'next/image'
import md5 from 'md5'
import theme from '../../../styles/theme'

export type AvatarProps = {
  name: string
  email?: string
  size?: number
  fontSize?: number
  color?: string
  backgroundColor?: string
}

export function Avatar({
  name,
  email,
  size = 68,
  fontSize = 24,
  color = theme.colors.gray,
  backgroundColor = theme.colors.powderAsh
}: AvatarProps) {
  const getInitials = (string: string) =>
    string
      .match(/(^\S\S?|\b\S)?/g)!
      .join('')
      .match(/(^\S|\S$)?/g)!
      .join('')
      .toUpperCase()

  const getAlternativeText = () => `Avatar do ${name}`

  const getGravatarUrl = (email: string) => {
    return `https://www.gravatar.com/avatar/${md5(email)}?s=${size}&d=blank`
  }

  return (
    <S.Wrapper
      size={size}
      fontSize={fontSize}
      color={color}
      backgroundColor={backgroundColor}
      data-testid="avatar"
    >
      <div aria-hidden="true" className="avatar-initials">
        {getInitials(name)}
      </div>
      {email && (
        <Image
          src={getGravatarUrl(email)}
          alt={getAlternativeText()}
          layout="fill"
          className="avatar-image"
          unoptimized={true}
        />
      )}
    </S.Wrapper>
  )
}
