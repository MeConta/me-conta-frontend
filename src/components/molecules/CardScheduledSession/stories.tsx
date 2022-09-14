import { Story, Meta } from '@storybook/react'
import { CardAgendamento, CardAgendamentoProps } from '.'
import { DateInfo } from '../DateSelect/dateInfo'

export default {
  component: CardAgendamento,
  title: 'Molecules/CardAgendamento',
  argTypes: {
    onChange: { action: 'changed' }
  }
} as Meta

export const Default: Story<CardAgendamentoProps> = (args) => (
  <CardAgendamento {...args} />
)

Default.args = {
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  profileLink: 'https://www.google.com/',
  frentes: [0, 1, 2],
  title: 'Observação para a sessão',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque cursus lacinia. Duis vehicula, felis eu aliquam fermentum, diam mauris maximus tortor iam mauris maximus torto riam mauris  rtor',
  availability: DateInfo
}
