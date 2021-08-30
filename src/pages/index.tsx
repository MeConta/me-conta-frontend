import { Button } from 'components/atoms/Button'
import { CheckboxField } from 'components/atoms/CheckboxField'
import { PasswordField } from 'components/atoms/PasswordField'
import { PhoneField } from 'components/atoms/PhoneField'
import { RadioField } from 'components/atoms/RadioField'
import { TextField } from 'components/atoms/TextField'

export default function Home() {
  return (
    <div>
      <Button color="negative" radius="square">
        Conheça toda equipe
      </Button>
      <TextField placeholder="Digite seu some" label="nome completo" />
      <PasswordField
        placeholder="Digite sua senha"
        name="password"
        label="password"
      />
      <PhoneField label="Telefone" />
      <CheckboxField label="checkbox" />
      <RadioField
        name="gender"
        disabled
        label="Gênero"
        options={['Masculino', 'Feminino']}
      />
    </div>
  )
}
