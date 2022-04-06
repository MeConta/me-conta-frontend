import { Story, Meta } from '@storybook/react'

import Loader from './index'

export default {
  component: Loader,
  title: 'Atoms/Loader'
} as Meta

export const Default: Story = (args) => <Loader {...args} />
