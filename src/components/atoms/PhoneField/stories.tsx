import { Story, Meta } from '@storybook/react'

import { PhoneField, PhoneFieldProps } from '.'

export default {
  component: PhoneField,
  title: 'Atoms/PhoneField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<PhoneFieldProps> = (args) => (
  <PhoneField {...args} />
)

Default.args = {
  label: 'Telefone',
  required: false
}
