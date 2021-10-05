export enum EHttpErrorCode {
  DUPLICATED_EMAIL = 409
}

export function getErrorMessage(error: EHttpErrorCode) {
  switch (error) {
    case EHttpErrorCode.DUPLICATED_EMAIL:
      return 'E-mail duplicado!'
    default:
      return (
        <div>
          Algo deu errado!
          <br /> Tente novamente mais tarde.
        </div>
      )
  }
}
