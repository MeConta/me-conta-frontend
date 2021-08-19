import { Story, Meta } from '@storybook/react'

import { Button, Props } from '.'

export default {
  component: Button,
  title: 'Components/Button',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<Props> = (args) => <Button {...args} />
export const asLink: Story<Props> = (args) => <Button {...args} />

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
