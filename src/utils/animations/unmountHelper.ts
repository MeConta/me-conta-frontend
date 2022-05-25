import { useEffect, useState } from 'react'
import { css } from 'styled-components'

const DEFAULT_DURATION: number = 500

export default function useDelayUnmount(
  isMounted: boolean | undefined,
  delayTime = DEFAULT_DURATION
) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isMounted && !shouldRender) {
      setShouldRender(true)
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])
  return shouldRender
}

interface AnimationProp {
  marginLeftBefore?: string
  marginLeftAfter?: string
  duration?: string
}

export const animation = {
  translateRightIn: (props?: AnimationProp) => css`
    animation: translateRightIn ${props?.duration ?? `${DEFAULT_DURATION}ms`}
      ease-out forwards;
    @keyframes translateRightIn {
      0% {
        opacity: 0;
        margin-left: ${props?.marginLeftBefore ?? '-30px'};
      }
      30% {
        opacity: 0;
      }
      100% {
        opacity: 1;
        margin-left: ${props?.marginLeftAfter ?? '15px'};
      }
    }
  `,
  translateLeftOut: (props?: AnimationProp) => css`
    animation: translateLeftOut ${props?.duration ?? `${DEFAULT_DURATION}ms`}
      ease-in forwards;
    @keyframes translateLeftOut {
      0% {
        opacity: 1;
        margin-left: ${props?.marginLeftAfter ?? '15px'};
      }
      70% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        margin-left: ${props?.marginLeftBefore ?? '-30px'};
      }
    }
  `,
  fadeIn: (props?: AnimationProp) => css`
    animation: fadeIn ${props?.duration ?? `${DEFAULT_DURATION}ms`} ease-in
      forwards;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `,
  fadeOut: (props?: AnimationProp) => css`
    animation: fadeOut ${props?.duration ?? `${DEFAULT_DURATION}ms`} ease-out
      forwards;
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
  `
}
