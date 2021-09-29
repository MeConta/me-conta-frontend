import { TeamMember } from 'components/molecules/Carousel'
import { FormCadastro } from '../components/molecules/FormCadastro'
import { useContext } from 'react'
import { SignupContext } from '../services/signup-service/signup-service'
import { UserType } from '../enums/user-type.enum'

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
      <h1>Faça seu cadastro</h1>
      <FormCadastro
        signupService={signupService}
        handleSuccess={(form) => {
          if (form.tipo === UserType.ALUNO) {
            alert('Deve redirecionar para Dashboard')
          } else {
            alert('Deve redirecionar para Form de Voluntario')
          }
        }}
        handleError={(error) => {
          console.log(error, error.code)
          alert('Deu Ruim!')
        }}
      />
    </div>
  )
}
