import { Story, Meta } from '@storybook/react'

import { Carousel, CarouselProps } from '.'

export default {
  component: Carousel,
  title: 'Atoms/Carousel',
  argTypes: {
    children: {
      type: 'string'
    }
  }
} as Meta

export const Default: Story<CarouselProps> = (args) => <Carousel {...args} />

Default.args = {
  teamMembers: [
    {
      name: 'Letícia Ferraz',
      title: 'Psicóloga'
    },
    { name: 'Vitória Melo', title: 'Psicóloga' },
    { name: 'Jéssica Ribeiro', title: 'Psicóloga' },
    { name: 'Aline Dantas', title: 'Psicóloga' },
    { name: 'Letícia Ferraz', title: 'Psicóloga' }
  ]
}
