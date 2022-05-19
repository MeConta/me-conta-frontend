import ConfirmationDialog from '../../components/molecules/ConfirmationDialog'
import * as F from '../../styles/form/styles'

export default function EmailDeRecuperacaoDeSenha() {
  return (
    <ConfirmationDialog
      titleInfo={{ boldText: 'E-mail de recuperação enviado com sucesso' }}
      subtitle={
        <F.Paragraph
          color="black"
          style={{ lineHeight: '2.5rem', padding: '0 1rem' }}
        >
          <b>Verifique sua caixa de entrada</b> e siga os passos informados para
          recuperar sua senha. <br /> <br />
          Este link só estará disponível por <b>24 horas.</b> <br />
          Após esse prazo, será necessário realizar outra solicitação para a
          recuperação de senha.
        </F.Paragraph>
      }
      buttonText="VOLTAR À PÁGINA INICIAL"
    />
  )
}
