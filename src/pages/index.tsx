import { Button } from 'components/atoms/Button'
import { Input } from 'components/atoms/Input'


export default function Home() {
  return (
    <>
      <br/>
      <div>
        <label> Nome:
          <Input />
        </label>
        <label> Senha:
          <Input type='password' />
        </label>
      </div>
      <label>Escola:
      <select><option>Publico</option><option>Privada</option></select>
      </label>
      <br/>
        <Button color="negative" radius='square' >Conheça toda equipe</Button>
    </>
  )
}
