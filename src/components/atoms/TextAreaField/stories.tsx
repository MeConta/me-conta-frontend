import { Story, Meta } from '@storybook/react'

import { TextAreaField, TextAreaFieldProps } from '.'

export default {
  component: TextAreaField,
  title: 'Atoms/TextAreaField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<TextAreaFieldProps> = (args) => (
  <TextAreaField {...args} />
)

Default.args = {
  label: 'Descrição',
  placeholder: 'Digite aqui'
}
