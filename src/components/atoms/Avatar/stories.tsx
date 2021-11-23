import { Story, Meta } from '@storybook/react'
import { Avatar, AvatarProps } from '.'

export default {
  component: Avatar,
  title: 'Atoms/Avatar'
} as Meta

export const Gravatar: Story<AvatarProps> = (args) => <Avatar {...args} />

Gravatar.args = {
  name: 'Luvois Zaladar',
  email: 'jitewaboh@lagify.com',
  size: 68,
  fontSize: 24
}

export const Initials: Story<AvatarProps> = (args) => <Avatar {...args} />

Initials.args = {
  name: 'Luvois Zaladar',
  email: '',
  size: 68,
  fontSize: 24,
  backgroundColor: '#F1FAFF',
  color: '#009EF7'
}
