import { Story, Meta } from '@storybook/react'

import { Button, ButtonProps } from '.'

export default {
  component: Button,
  title: 'Atoms/Button',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<ButtonProps> = (args) => <Button {...args} />
export const asLink: Story<ButtonProps> = (args) => <Button {...args} />

Default.args = {
  color: 'primary',
  size: 'large',
  radius: 'round',
  children: 'Button'
}

asLink.args = {
  color: 'primary',
  size: 'large',
  radius: 'round',
  children: 'Button',
  as: 'a',
  href: '/link'
}
