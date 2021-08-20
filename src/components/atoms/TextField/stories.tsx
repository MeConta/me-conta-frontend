import { Story, Meta } from '@storybook/react'

import { TextInput, TextInputProps } from '.'

export default {
  component: TextInput,
  title: 'Atoms/TextInput',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<TextInputProps> = (args) => <TextInput {...args} />

Default.args = {
  label: 'Descrição',
  placeholder: 'Digite aqui'
}
