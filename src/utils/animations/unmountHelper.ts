import { useEffect, useState } from 'react'

const DEFAULT_DURATION: number = 500

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
      timeoutId = setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])
  return shouldRender
}
