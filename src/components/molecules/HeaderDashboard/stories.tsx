import { Story, Meta } from '@storybook/react'

import HeaderDashboard, { HeaderDashboardProps } from '.'

export default {
  component: HeaderDashboard,
  title: 'Molecules/HeaderDashboard'
} as Meta

export const Default: Story<HeaderDashboardProps> = (args) => (
  <HeaderDashboard {...args} />
)

Default.args = {
  userName: 'John Doe'
}
