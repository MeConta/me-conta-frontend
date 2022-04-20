import { UserType } from 'enums/user-type.enum'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from 'store/auth-context'
import { redirects } from 'utils/routes/redirects'

type AuthenticatedRouteOptions = {
  allowedRoles: UserType[]
}

export const authenticatedRoute = (
  Component: NextComponentType,
  options: AuthenticatedRouteOptions = {
    allowedRoles: []
  }
) => {
  const AuthenticatedComponent = () => {
    const authCtx = useAuthContext()
    const router = useRouter()

    const userRoleIsAuthorized = (params: {
      userRole: number
      allowedRoles: number[]
    }) => {
      return params.allowedRoles.includes(params.userRole)
    }

    useEffect(() => {
      if (!authCtx.isLoggedIn) {
        authCtx.handleLogout()
        return
      }
      if (
        authCtx.session.type &&
        !userRoleIsAuthorized({
          userRole: +authCtx.session.type,
          allowedRoles: options.allowedRoles
        })
      ) {
        const route = redirects[+authCtx.session.type]
        router.push(route)
      }
    }, [authCtx, router])

    return <Component />
  }

  return AuthenticatedComponent
}
