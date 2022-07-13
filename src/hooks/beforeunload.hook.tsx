import { useEffect } from 'react'

export const useBeforeUnload = (
  handler: (event: BeforeUnloadEvent) => boolean,
  enableModalBrowserExit: boolean
) => {
  useEffect(() => {
    if (enableModalBrowserExit) {
      window.addEventListener('beforeunload', handler)
      return () => window.removeEventListener('beforeunload', handler)
    }
  }, [handler, enableModalBrowserExit])
}
