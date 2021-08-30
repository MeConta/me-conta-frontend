import { Story, Meta } from '@storybook/react'

import { RadioField, RadioFieldProps } from '.'

export default {
  component: RadioField,
  title: 'Atoms/RadioField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<RadioFieldProps> = (args) => (
  <RadioField {...args} />
)

Default.args = {
  label: 'Descrição',
  options: ['test-1', 'test-2'],
  name: 'gender'
}
