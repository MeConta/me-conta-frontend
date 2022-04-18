import { Story, Meta } from '@storybook/react'

import { Header } from '.'

export default {
  component: Header,
  title: 'Molecules/Header',
  argTypes: {
    unoptimizedImage: {
      control: false
    }
  }
} as Meta

export const Default: Story = () => <Header unoptimizedImage />
