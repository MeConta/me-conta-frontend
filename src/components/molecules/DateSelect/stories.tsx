import { Story, Meta } from '@storybook/react'

import teamMemberExample from '../../../../public/assets/teamMemberExample2.png'
import { DateSelect, DateSelectProps } from '.'

export default {
  component: DateSelect,
  title: 'Molecules/DateSelect',
  argTypes: {
    children: {
      type: 'string'
    },
    unoptimizedImage: {
      control: false
    }
  }
} as Meta

export const Default: Story<DateSelectProps> = (args) => (
  <DateSelect unoptimizedImage {...args} />
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
