import { TextField } from 'components/atoms/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ISignupService } from 'services/signup-service/signup-service'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'

import * as S from './styles'
import { Button } from 'components/atoms/Button'

type FormAtendenteProps = {
  signupService: ISignupService
}

type MyFormValues = {
  dataNascimento: string
  cidade: string
  estado: EBrazilStates | string
  genero: string
  telefone: number
  formado: boolean
  instituicao: string
  frentes: string[]
  bio: string
}

const FIELDS_CONFIGS = {
  MAX_LENGHT_CIDADE: 60, // validar
  MIN_LENGHT_CIDADE: 2 // validar
}

const FIELDS_ERRORS = {
  REQUIRED_CIDADE: 'Cidade é obrigatório',
  MAX_CIDADE: `Cidade deve conter menos de ${FIELDS_CONFIGS.MAX_LENGHT_CIDADE} caracteres`,
  MIN_CIDADE: `Cidade deve conter mais de ${FIELDS_CONFIGS.MIN_LENGHT_CIDADE} caracteres`,
  REQUIRED_DATA_NASCIMENTO: 'Data de nascimento é obrigatório'
}

export function FormAtendente({ signupService }: FormAtendenteProps) {
  const validation = Yup.object({
    dataNascimento: Yup.string().required(
      FIELDS_ERRORS.REQUIRED_DATA_NASCIMENTO
    ),
    cidade: Yup.string()
      .required(FIELDS_ERRORS.REQUIRED_CIDADE)
      .trim()
      .min(FIELDS_CONFIGS.MIN_LENGHT_CIDADE, FIELDS_ERRORS.MIN_CIDADE)
      .max(FIELDS_CONFIGS.MAX_LENGHT_CIDADE, FIELDS_ERRORS.MAX_CIDADE)
  })

  const initialValues: MyFormValues = {
    dataNascimento: '',
    cidade: '',
    estado: '',
    genero: '',
    telefone: 0,
    formado: false,
    instituicao: '',
    frentes: [],
    bio: ''
  }

  const formSubmit = async (form: MyFormValues) => {
    console.log(form)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmit}
      validationSchema={validation}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid
      }) => (
        <S.Form onSubmit={handleSubmit}>
          <TextField
            label="Data de nascimento"
            name="dataNascimento"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dataNascimento}
            error={errors.dataNascimento}
          />
          <TextField
            label="Cidade"
            name="cidade"
            onChange={handleChange}
            maxLength={FIELDS_CONFIGS.MAX_LENGHT_CIDADE}
            onBlur={handleBlur}
            value={values.cidade}
            error={errors.cidade}
          />
          <S.ButtonContainer>
            <Button
              radius="square"
              disabled={isSubmitting || !isValid}
              type="submit"
            >
              CADASTRAR
            </Button>
          </S.ButtonContainer>
        </S.Form>
      )}
    </Formik>
  )
}
