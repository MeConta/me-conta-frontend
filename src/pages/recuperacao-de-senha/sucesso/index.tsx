import ConfirmationDialog from 'components/molecules/ConfirmationDialog'

export default function RecuperacaoSenhaSucesso() {
  return (
    <ConfirmationDialog
      titleInfo={{
        preText: 'SUA SENHA FOI REDEFINIDA COM ',
        boldText: 'SUCESSO!'
      }}
      subtitleInfo={{
        posText: 'Clique no botão abaixo para efetuar seu login'
      }}
      buttonText="ACESSAR MINHA CONTA"
      buttonLink="/login"
    />
  )
}
