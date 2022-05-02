export type CadastroAlunoValues = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: string
  genero: string
  tipoEscola: string
  escolaridade: string
  necessidades: string
  expectativas: string
  tratamentos: string
}

export type DadosPessoaisValues = Pick<
  CadastroAlunoValues,
  'telefone' | 'dataNascimento' | 'UF' | 'cidade' | 'genero'
>
