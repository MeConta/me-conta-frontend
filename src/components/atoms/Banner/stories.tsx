import { Story, Meta } from '@storybook/react'
import Banner, { BannerProps } from '.'
import { Button } from '../Button'

export default {
  component: Banner,
  title: 'Atoms/Banner'
} as Meta

export const Default: Story<BannerProps> = (args) => <Banner {...args} />

const bannerContent = (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around'
    }}
  >
    <h1>Título do Banner</h1>
    <p>Texto adicional</p>
    <Button color="secondary" radius="square" size="mediumLarge">
      EXEMPLO DE BOTÃO
    </Button>
  </div>
)

Default.args = {
  children: bannerContent
}
