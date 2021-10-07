import * as Yup from 'yup'
import { Formik } from 'formik'
import * as S from './styles'
import { TextField } from '../../atoms/TextField'
import { PhoneField } from '../../atoms/PhoneField'

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2

type MyFormValues = {
  name: string
  phoneNumber: string
  dataNascimento: string
}

const ERRORS = {
  REQUIRED_NAME: `Nome completo é obrigatório.`,
  REQUIRED_PHONE: `Telefone é obrigatório.`,
  MIN_LENGHT_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres`,
  MAX_LENGHT_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres`,
  REQUIRED_DATA_NASCIMENTO: 'Data de nascimento é obrigatório',
  MAX_BIRTHDATE: 'Data de nascimento inválida'
}

const today = new Date()

const FormAluno = () => {
  const validation = Yup.object({
    name: Yup.string()
      .required(ERRORS.REQUIRED_NAME)
      .trim()
      .min(MIN_LENGTH_NAME_VALUE, ERRORS.MIN_LENGHT_NAME)
      .max(MAX_LENGTH_NAME_VALUE, ERRORS.MAX_LENGHT_NAME),
    phoneNumber: Yup.string().required(ERRORS.REQUIRED_PHONE),
    dataNascimento: Yup.date()
      .required(ERRORS.REQUIRED_DATA_NASCIMENTO)
      .max(today, ERRORS.MAX_BIRTHDATE)
  })

  const initialValues: MyFormValues = {
    name: '',
    phoneNumber: '',
    dataNascimento: ''
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
          <PhoneField
            initialValue={initialValues.phoneNumber}
            data-testid="phone-number"
            label={'Telefone'}
            name={'phoneNumber'}
            disabled={false}
            onBlur={handleBlur}
            error={errors.phoneNumber}
            value={values.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Data de nascimento"
            name="dataNascimento"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dataNascimento}
            error={errors.dataNascimento}
          />
        </S.Form>
      )}
    </Formik>
  )
}

export default FormAluno
