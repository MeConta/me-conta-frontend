import { GetServerSideProps, NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthService } from 'services/auth-services/auth-service'

type AuthenticatedRouteOptions = {
  allowedRoles: number[]
}

export const authenticatedRoute = (
  Component: NextComponentType,
  options: AuthenticatedRouteOptions = {
    allowedRoles: [0, 1, 2]
  }
) => {
  const AuthenticatedComponent = () => {
    const authCtx = useAuthService()
    const router = useRouter()

    useEffect(() => {
      if (
        !authCtx.isLoggedIn &&
        options.allowedRoles.includes(+authCtx.session.tipo)
      ) {
        authCtx.handleLogout()
      }
    }, [authCtx, router])

    return <Component />
  }

  return AuthenticatedComponent
}
