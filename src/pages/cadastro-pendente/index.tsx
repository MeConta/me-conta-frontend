import ConfirmationDialog from 'components/molecules/ConfirmationDialog'

export default function CadastroPendente() {
  return (
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
}
