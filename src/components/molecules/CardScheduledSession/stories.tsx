import { Story, Meta } from '@storybook/react'
import { CardScheduledSession, CardScheduledSessionProps } from '.'

export default {
  component: CardScheduledSession,
  title: 'Molecules/CardScheduledSession'
} as Meta

export const Default: Story<CardScheduledSessionProps> = (args) => (
  <CardScheduledSession {...args} />
)

Default.args = {
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  frentes: [0, 1, 2]
}
