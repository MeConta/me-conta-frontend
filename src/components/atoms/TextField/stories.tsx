import { Story, Meta } from '@storybook/react'

import { TextField, TextFieldProps } from '.'

export default {
  component: TextField,
  title: 'Atoms/TextField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<TextFieldProps> = (args) => <TextField {...args} />

Default.args = {
  label: 'Descrição',
  placeholder: 'Digite aqui',
  required: false
}
