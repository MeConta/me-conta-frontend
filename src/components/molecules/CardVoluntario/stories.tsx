import { Story, Meta } from '@storybook/react'
import { CardVoluntario, CardVoluntarioProps } from '.'

export default {
  component: CardVoluntario,
  title: 'Molecules/CardVoluntario'
} as Meta

export const Default: Story<CardVoluntarioProps> = (args) => (
  <CardVoluntario {...args} />
)

Default.args = {
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  profileLink: 'https://www.google.com/',
  frentes: [0, 1, 2],
  title: 'Observação para a sessão',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque cursus lacinia. Duis vehicula, felis eu aliquam fermentum, diam mauris maximus tortor iam mauris maximus torto riam mauris  rtor'
}
