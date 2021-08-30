import { Story, Meta } from '@storybook/react'

import { CheckboxField, CheckboxFieldProps } from '.'

export default {
  component: CheckboxField,
  title: 'Atoms/CheckboxField',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<CheckboxFieldProps> = (args) => (
  <CheckboxField {...args} />
)

Default.args = {
  label: 'Descrição'
}
