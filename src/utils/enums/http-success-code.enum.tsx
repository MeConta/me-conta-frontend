export enum EHttpSuccess {
  OK = 200,
  CREATED = 201
}

export function getSuccessMessage(statusCode: EHttpSuccess) {
  if (statusCode === EHttpSuccess.CREATED)
    return 'O registro foi criado com sucesso!'

  return 'A operação foi realizada com sucesso!'
}
