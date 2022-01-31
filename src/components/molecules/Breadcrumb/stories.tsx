import { Story, Meta } from '@storybook/react'
import Breadcrumb from '.'

export default {
  component: Breadcrumb,
  title: 'Molecules/Breadcrumb',
  parameters: {
    nextRouter: {
      path: '/home/agenda',
      asPath: '/home/agenda'
    }
  }
} as Meta

export const Default: Story = (args) => <Breadcrumb {...args} />

Default.args = {
  title: 'Dashboard'
}
