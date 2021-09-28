import { Button } from 'components/atoms/Button'
import { CheckboxField } from 'components/atoms/CheckboxField'
import { PasswordField } from 'components/atoms/PasswordField'
import { PhoneField } from 'components/atoms/PhoneField'
import { RadioField } from 'components/atoms/RadioField'
import { SelectField } from 'components/atoms/SelectField'
import { TextField } from 'components/atoms/TextField'
import { TextAreaField } from 'components/atoms/TextAreaField'
import { Carousel, TeamMember } from 'components/molecules/Carousel'
import { FormCadastro } from '../components/molecules/FormCadastro'
import { useContext } from 'react'
import { SignupContext } from '../services/signup-service/signup-service'

export default function Home() {
  const img: StaticImageData = {
    src: '/teamMemberExample2.png',
    height: 100,
    width: 100,
    placeholder: ''
  }
  const members: TeamMember[] = [
    { name: 'at01', title: 'psicólogo', imageSrc: img, imageAlt: '' },
    { imageSrc: img, imageAlt: '', name: 'at02', title: 'psicólogo' },
    { imageSrc: img, imageAlt: '', name: 'at03', title: 'psicólogo' },
    { imageSrc: img, imageAlt: '', name: 'at04', title: 'psicólogo' },
    { imageSrc: img, imageAlt: '', name: 'at05', title: 'psicólogo' }
  ]

  const { signupService } = useContext(SignupContext)

  return (
    <div>
      {/* <Button color="negative" radius="square">
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
      <Carousel teamMembers={members} /> */}
      <FormCadastro
        signupService={signupService}
        handleSuccess={() => alert('Deu Bom')}
        handleError={(error) => {
          alert('Deu Ruim!')
          console.log(error)
        }}
      />
    </div>
  )
}
