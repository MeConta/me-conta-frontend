import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthService } from 'services/auth-services/auth-service'

export const authenticatedRoute = (
  Component: NextComponentType,
  options: { pathAfterFailure: string } = {
    pathAfterFailure: '/login'
  }
) => {
  const AuthenticatedComponent = () => {
    const authCtx = useAuthService()
    const router = useRouter()

    useEffect(() => {
      if (typeof authCtx.isLoggedIn === 'boolean' && !authCtx.isLoggedIn) {
        router.push(options.pathAfterFailure)
      }
    }, [authCtx, router])

    return (
      <>
        {(authCtx.isLoggedIn && <Component />) || (
          <div> Checando autenticação... </div>
        )}
      </>
    )
  }

  return AuthenticatedComponent
}
