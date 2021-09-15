import { Story, Meta } from '@storybook/react'

import teamMemberExample from '../../../assets/teamMemberExample2.png'
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
      imageSrc: teamMemberExample,
      imageAlt: 'A team member image',
      name: 'Letícia Ferraz',
      title: 'Psicóloga'
    },
    {
      imageSrc: teamMemberExample,
      imageAlt: 'A team member image',
      name: 'Vitória Melo',
      title: 'Psicóloga'
    },
    {
      imageSrc: teamMemberExample,
      imageAlt: 'A team member image',
      name: 'Jéssica Ribeiro',
      title: 'Psicóloga'
    },
    {
      imageSrc: teamMemberExample,
      imageAlt: 'A team member image',
      name: 'Aline Dantas',
      title: 'Psicóloga'
    },
    {
      imageSrc: teamMemberExample,
      imageAlt: 'A team member image',
      name: 'Letícia Ferraz',
      title: 'Psicóloga'
    }
  ],
  unoptimizedImage: true
}
