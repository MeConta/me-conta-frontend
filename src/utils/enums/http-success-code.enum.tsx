export enum EHttpSuccess {
  CREATED = 201
}

export function getSuccessMessage(statusCode: EHttpSuccess) {
  switch (statusCode) {
    case EHttpSuccess.CREATED:
      return 'O registro foi criado com sucesso!'
    default:
      return 'A operação foi realizada com sucesso!'
  }
}
