import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ElementType,
  useEffect,
  useState
} from 'react'
import useDelayUnmount from '../../../utils/animations/useDelayUnmount'
import Loader from '../Loader'

import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  children: React.ReactNode
  size?:
    | 'small'
    | 'medium'
    | 'mediumLarge'
    | 'xMedium'
    | 'large'
    | 'smallMedium'
  color?: 'primary' | 'secondary' | 'negative' | 'success'
  radius?: 'round' | 'square'
  textTransform?: 'uppercase'
  btnStyle?: 'link'
  prefixIcon?: React.ReactNode
  sufixIcon?: React.ReactNode
  isLoading?: boolean
  disabled?: boolean
  fillOver?: boolean
  fillOverDuration?: number
  onFillDone?: Function
  as?: ElementType
} & ButtonTypes

export function Button({
  children,
  size = 'large',
  color = 'primary',
  radius = 'round',
  textTransform,
  btnStyle,
  prefixIcon,
  sufixIcon,
  isLoading,
  disabled,
  fillOver,
  fillOverDuration = 5000,
  onFillDone,
  ...props
}: ButtonProps) {
  const [isFillDone, setFillDone] = useState(false)
  useEffect(() => {
    setFillDone(false)
    let timeout: NodeJS.Timeout
    if (fillOver) {
      timeout = setTimeout(() => setFillDone(fillOver), fillOverDuration)
    }
    return () => clearTimeout(timeout)
  }, [fillOver, fillOverDuration])
  useEffect(() => {
    if (onFillDone && isFillDone && fillOver) {
      onFillDone()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFillDone])
  return (
    <S.Wrapper
      size={size}
      color={color}
      radius={radius}
      textTransform={textTransform}
      btnStyle={btnStyle}
      prefixIcon={prefixIcon}
      sufixIcon={sufixIcon}
      isLoading={isLoading}
      disabled={disabled || isLoading}
      fillOver={fillOver}
      fillOverDuration={fillOverDuration}
      {...props}
    >
      {prefixIcon}
      <S.TextWrapper>{children}</S.TextWrapper>
      {sufixIcon}
      {useDelayUnmount(isLoading) && <Loader size="30px" borderSize="5px" />}
    </S.Wrapper>
  )
}
