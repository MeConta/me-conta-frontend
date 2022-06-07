import { UserType } from 'enums/user-type.enum'
import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'store/auth-context'
import { redirects } from 'utils/routes/redirects'
import Loader from '../../components/atoms/Loader'

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
    const [shouldRender, setShouldRender] = useState(false)

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
        (!userRoleIsAuthorized({
          userRole: +authCtx.session.type,
          allowedRoles: options.allowedRoles
        }) ||
          !authCtx.session.completeProfile)
      ) {
        const route = authCtx.session.completeProfile
          ? redirects[+authCtx.session.type]
          : '/criar-conta'
        router.push(route)
      }
      if (
        authCtx.isLoggedIn &&
        authCtx.session.type &&
        userRoleIsAuthorized({
          userRole: +authCtx.session.type,
          allowedRoles: options.allowedRoles
        }) &&
        authCtx.session.completeProfile
      ) {
        setShouldRender(true)
      }
    }, [authCtx, router])

    return shouldRender ? <Component /> : <Loader />
  }

  return AuthenticatedComponent
}
