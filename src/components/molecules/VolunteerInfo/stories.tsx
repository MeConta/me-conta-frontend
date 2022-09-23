import { Story, Meta } from '@storybook/react'
import { VolunteerInfo, VolunteerInfoProps } from '.'

export default {
  component: VolunteerInfo,
  title: 'Molecules/VolunteerInfo'
} as Meta

export const Default: Story<VolunteerInfoProps> = (args) => (
  <VolunteerInfo {...args} />
)

Default.args = {
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  profileLink: 'https://www.google.com/',
  frentes: [0]
}
