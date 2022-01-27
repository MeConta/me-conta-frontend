import { Story, Meta } from '@storybook/react'

import { SelectField, SelectFieldProps } from '.'

export default {
  component: SelectField,
  title: 'Atoms/SelectField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<SelectFieldProps> = (args) => (
  <SelectField {...args} />
)

Default.args = {
  label: 'Descrição',
  options: [{ value: 'teste', label: 'teste' }],
  required: false
}
