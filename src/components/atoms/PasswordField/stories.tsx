import { Story, Meta } from '@storybook/react'

import { PasswordField, PasswordFieldProps } from '.'

export default {
  component: PasswordField,
  title: 'Atoms/PasswordField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<PasswordFieldProps> = (args) => (
  <PasswordField {...args} />
)

Default.args = {
  label: 'Descrição',
  placeholder: 'Digite aqui'
}
