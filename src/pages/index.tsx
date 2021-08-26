import { Button } from 'components/atoms/Button'
import { PhoneField } from 'components/atoms/PhoneField'
import { TextField } from 'components/atoms/TextField'

export default function Home() {
  return (
    <div>
      <Button color="negative" radius="square">
        Conheça toda equipe
      </Button>
      <TextField label="nome completo" />
      <TextField type="password" label="password" />
      <PhoneField />
    </div>
  )
}
