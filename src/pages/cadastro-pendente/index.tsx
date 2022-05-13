import ConfirmationDialog from 'components/molecules/ConfirmationDialog'
import { UserType } from 'enums/user-type.enum'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthContext } from 'store/auth-context'
import { redirects } from 'utils/routes/redirects'

export default function CadastroPendente() {
  const router = useRouter()
  const authCtx = useAuthContext()
  const [renderPendente, setRenderPendente] = useState<boolean>(false)
  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.push('/login')
    } else if (+authCtx.session.type !== UserType.ATENDENTE) {
      router.push(redirects[+authCtx.session.type])
    } else {
      setRenderPendente(true)
    }
  }, [authCtx.isLoggedIn, authCtx.session.type, router])

  return (
    renderPendente && (
      <ConfirmationDialog
        titleInfo={{ preText: 'SUA INSCRIÇÃO FOI ', boldText: 'CONCLUÍDA!' }}
        subtitleInfo={{
          preText: 'Nossa equipe irá analisar seu perfil e entrará em ',
          boldText: 'contato por e-mail ',
          posText: 'em breve.'
        }}
        buttonText="VOLTAR À PÁGINA INICIAL"
      />
    )
  )
}
