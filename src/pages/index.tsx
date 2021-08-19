import { Button } from 'components/atoms/Button'
import { TextInput } from 'components/atoms/TextField'
import { useState } from 'react'

export default function Home() {
  return (
    <div>
      <Button color="negative" radius="square">
        Conheça toda equipe
      </Button>
      <TextInput label="nome completo"/>
      <TextInput type="email" label="telefone"/>
    </div>
  )
}
