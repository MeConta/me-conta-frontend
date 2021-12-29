import { Story, Meta } from '@storybook/react'
import { CardPaciente, CardPacienteProps } from '.'

export default {
  component: CardPaciente,
  title: 'Molecules/CardPaciente'
} as Meta

export const Default: Story<CardPacienteProps> = (args) => (
  <CardPaciente {...args} />
)

Default.args = {
  date: '29 de Janeiro às 14h',
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  profileLink: 'https://www.google.com/',
  frentes: [0, 1, 2],
  title: 'Observação para a sessão',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque cursus lacinia. Duis vehicula, felis eu aliquam fermentum, diam mauris maximus tortor iam mauris maximus torto riam mauris  rtor',
  whatsappLink: 'https://web.whatsapp.com/send?phone=5581986267022'
}
