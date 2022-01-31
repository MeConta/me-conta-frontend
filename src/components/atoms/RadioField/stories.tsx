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
  required: false,
  options: [
    { label: 'test-1', value: 1 },
    { label: 'test-2', value: 2 },
    { label: 'test-3', value: 3 }
  ],
  name: 'gender'
}
