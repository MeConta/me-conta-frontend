import { Story, Meta } from '@storybook/react'

import HeaderDashboard from '.'

export default {
  component: HeaderDashboard,
  title: 'Molecules/HeaderDashboard',
  argTypes: {}
} as Meta

export const Default: Story = () => <HeaderDashboard />
