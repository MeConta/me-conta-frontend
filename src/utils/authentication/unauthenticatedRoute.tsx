import { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'store/auth-context'
import { redirects } from 'utils/routes/redirects'
import Loader from '../../components/atoms/Loader'

export const unauthenticatedRoute = (Component: NextComponentType) => {
  const UnauthenticatedComponent = () => {
    const authCtx = useAuthContext()
    const router = useRouter()
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
      if (!authCtx.isLoggedIn) setShouldRender(true)

      if (authCtx.isLoggedIn && authCtx.session.type) {
        const route = authCtx.session.completeProfile
          ? redirects[+authCtx.session.type]
          : '/criar-conta'
        router.push(route)
      }
    }, [authCtx, router])

    return shouldRender ? <Component /> : <Loader />
  }

  return UnauthenticatedComponent
}
