import { Button } from 'components/atoms/Button'
import { TextInput } from 'components/atoms/TextField'

export default function Home() {
  return (
    <div>
      <Button color="negative" radius="square">
        Conheça toda equipe
      </Button>
      <TextInput label="nome completo" />
      <TextInput type="password" label="password" />
    </div>
  )
}
