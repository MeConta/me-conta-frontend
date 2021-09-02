import { Button } from 'components/atoms/Button'
import { CheckboxField } from 'components/atoms/CheckboxField'
import { PasswordField } from 'components/atoms/PasswordField'
import { PhoneField } from 'components/atoms/PhoneField'
import { RadioField } from 'components/atoms/RadioField'
import { SelectField } from 'components/atoms/SelectField'
import { TextField } from 'components/atoms/TextField'
import { TextAreaField } from 'components/atoms/TextAreaField'

export default function Home() {
  return (
    <div>
      <Button color="negative" radius="square">
        Conheça toda equipe
      </Button>
      <TextField
        name="name"
        label="nome completo"
        placeholder="Digite seu some"
        error="Error Message"
      />
      <PasswordField
        placeholder="Digite sua senha"
        name="password"
        label="password"
      />
      <PhoneField name="phone" label="Telefone" />
      <CheckboxField label="checkbox" error="Error" disabled />
      <RadioField
        name="gender"
        disabled
        label="Gênero"
        options={['Masculino', 'Feminino']}
      />
      <SelectField
        name="select"
        label="Animal"
        options={[
          { value: 'cachorro', label: 'cachorro' },
          { value: 'gato', label: 'gato' }
        ]}
      />
      <TextAreaField label="textarea" name="textarea" />
    </div>
  )
}
