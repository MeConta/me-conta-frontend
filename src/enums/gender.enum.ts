export enum Gender {
  M = 'Masculino',
  F = 'Feminino',
  NB = 'Não Binário',
  ND = 'Não Declarado'
}

export type GenderTypes = keyof typeof Gender
