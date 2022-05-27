import router from 'next/router'
import { useEffect } from 'react'

interface LogoutDialogProps {
  redirectTo: string
}

export default function LogoutDialog({}) {
  useEffect(() => {
    setTimeout(redirect, 3000)
  }, [])
  function redirect() {
    router.push('/')
  }
  return (
    <div>
      <p>Você desconectou da nossa plataforma</p>
      <p>Em instantes você será redirecionado para a página principal</p>
    </div>
  )
}
