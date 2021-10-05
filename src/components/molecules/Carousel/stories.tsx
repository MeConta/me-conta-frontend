import { Story, Meta } from '@storybook/react'

import teamMemberExample from '../../../../public/assets/teamMemberExample2.png'
import { Carousel, CarouselProps } from '.'

export default {
  component: Carousel,
  title: 'Molecules/Carousel',
  argTypes: {
    children: {
      type: 'string'
    },
    unoptimizedImage: {
      control: false
    }
  }
} as Meta

export const Default: Story<CarouselProps> = (args) => (
  <Carousel unoptimizedImage {...args} />
)

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
  ]
}
