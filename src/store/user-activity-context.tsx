import { createContext, PropsWithChildren, useState } from 'react'
import { IdleTimerProvider } from 'react-idle-timer'
import { useAuthContext } from './auth-context'

interface UserActivityContextProps {
  timeoutForIdleMs: number
  userIsIdle: boolean
}

const UserActivityContext = createContext<UserActivityContextProps>({
  timeoutForIdleMs: 60000, // 10 minutes
  userIsIdle: false
})

export const UserActivityContextProvider = (
  props: PropsWithChildren<UserActivityContextProps>
) => {
  const [userIsIdle, setUserIsIdle] = useState(false)
  const authCtx = useAuthContext()

  const onUserIdleHandler = () => {
    console.log('User is idle', new Date())
    if (authCtx.isLoggedIn) {
      console.log('Logging out the user')
      authCtx.handleLogout(true)
    }
    setUserIsIdle(true)
  }

  const onUserActiveHandler = () => {
    console.log('User is active', new Date())
    setUserIsIdle(false)
  }

  return (
    <UserActivityContext.Provider
      value={{
        timeoutForIdleMs: props.timeoutForIdleMs,
        userIsIdle
      }}
    >
      <IdleTimerProvider
        timeout={props.timeoutForIdleMs}
        onIdle={onUserIdleHandler}
        onActive={onUserActiveHandler}
      >
        {props.children}
      </IdleTimerProvider>
    </UserActivityContext.Provider>
  )
}
