import { useEffect, useState } from 'react'

// This DEFAULT_DURATION is measured in seconds
const DEFAULT_DURATION: number = 0.5

export default function useDelayUnmount(
  isMounted: boolean | undefined,
  delayTime: number = DEFAULT_DURATION
) {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    if (isMounted && !shouldRender) {
      setShouldRender(true)
    } else if (!isMounted && shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(false), delayTime * 1000)
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])
  return shouldRender
}
