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

const Template: Story<Props> = (args) => <Button {...args} />

export const Primary = Template.bind({})

Primary.args = {
  color: 'primary',
  size: 'large',
  radius: 'round',
  children: 'Button'
}
