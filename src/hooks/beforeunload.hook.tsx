import { useEffect } from 'react'

export const useBeforeUnload = (
  handler: (event: BeforeUnloadEvent) => boolean
) => {
  useEffect(() => {
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [handler])
}
