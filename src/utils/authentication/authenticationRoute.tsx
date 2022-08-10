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
    const userStatus = {
      LOGGED_OFF: !authCtx.isLoggedIn,
      NOT_AUTHORIZED:
        (authCtx.session.type &&
          !userRoleIsAuthorized({
            userRole: +authCtx.session.type,
            allowedRoles: options.allowedRoles
          })) ||
        !authCtx.session.permissaoNavegar,
      AUTHORIZED:
        authCtx.isLoggedIn &&
        authCtx.session.type &&
        authCtx.session.permissaoNavegar &&
        userRoleIsAuthorized({
          userRole: +authCtx.session.type,
          allowedRoles: options.allowedRoles
        }),
      COMPLETE_PROFILE: authCtx.session.completeProfile,
      INCOMPLETE_PROFILE:
        !authCtx.session.completeProfile && authCtx.session.type
    }

    useEffect(() => {
      if (userStatus.LOGGED_OFF) {
        authCtx.handleLogout()
        return
      }
      if (userStatus.NOT_AUTHORIZED || userStatus.INCOMPLETE_PROFILE) {
        const route = userStatus.COMPLETE_PROFILE
          ? redirects[+authCtx.session.type]
          : '/criar-conta'
        if (router.pathname !== route) {
          router.push(route)
        } else {
          setShouldRender(true)
        }
      }
      if (userStatus.AUTHORIZED && userStatus.COMPLETE_PROFILE) {
        setShouldRender(true)
      }
    }, [
      authCtx,
      router,
      userStatus.AUTHORIZED,
      userStatus.COMPLETE_PROFILE,
      userStatus.INCOMPLETE_PROFILE,
      userStatus.LOGGED_OFF,
      userStatus.NOT_AUTHORIZED
    ])

    return shouldRender ? <Component /> : <Loader />
  }

  return AuthenticatedComponent
}
