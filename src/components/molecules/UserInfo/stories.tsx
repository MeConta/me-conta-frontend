import { Story, Meta } from '@storybook/react'
import { UserInfo, UserInfoProps } from '.'

export default {
  component: UserInfo,
  title: 'Molecules/UserInfo'
} as Meta

export const Default: Story<UserInfoProps> = (args) => <UserInfo {...args} />

Default.args = {
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  profileLink: 'https://www.google.com/',
  frentes: [0]
}
