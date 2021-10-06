import * as Yup from 'yup'
import { Formik } from 'formik'
import * as S from './styles'
import { TextField } from '../../atoms/TextField'

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2

type MyFormValues = {
  name: string
}

const ERRORS = {
  REQUIRED_NAME: `Nome completo é obrigatório.`,
  MIN_LENGHT_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres`,
  MAX_LENGHT_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres`
}

const FormAluno = () => {
  const validation = Yup.object({
    name: Yup.string()
      .required(ERRORS.REQUIRED_NAME)
      .trim()
      .min(MIN_LENGTH_NAME_VALUE, ERRORS.MIN_LENGHT_NAME)
      .max(MAX_LENGTH_NAME_VALUE, ERRORS.MAX_LENGHT_NAME)
  })

  const initialValues: MyFormValues = {
    //TODO: buscar dados recém-cadastrados.
    name: ''
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        console.log('submitted')
      }}
      validationSchema={validation}
    >
      {({ values, errors, handleSubmit, handleChange, handleBlur }) => (
        <S.Form onSubmit={handleSubmit}>
          <TextField
            label="Nome Completo"
            name="name"
            maxLength={MAX_LENGTH_NAME_VALUE}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={errors.name}
          />
        </S.Form>
      )}
    </Formik>
  )
}

export default FormAluno
