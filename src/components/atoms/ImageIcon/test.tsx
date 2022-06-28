import { render, screen, waitFor } from '../../../utils/tests/helpers'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ImageIcon from './index'

const PROPS = {
  imageSrc:
    '../../public/assets/volunteer/services/orientacaoVocacionalIcon.png',
  imageAlt: 'teste-alt',
  imageHeight: 24.63,
  imageWidth: 24,
  backgroundColor: '#F8F5FF',
  tooltipText: 'Acolhimento'
}

describe('<ImageIcon />', () => {
  it('should render a ImageIcon with correct background color', () => {
    render(
      <ImageIcon
        imageSrc={PROPS.imageSrc}
        imageAlt={PROPS.imageAlt}
        imageHeight={PROPS.imageHeight}
        imageWidth={PROPS.imageWidth}
        backgroundColor={PROPS.backgroundColor}
        tooltip={PROPS.tooltipText}
      />
    )

    const image = screen.getByRole('img')

    expect(image).toBeInTheDocument()
    expect(image.parentElement).toHaveStyle(
      `background-color: ${PROPS.backgroundColor}`
    )
  })

  it('should render a ImageIcon with correct image path', async () => {
    render(
      <ImageIcon
        imageSrc={PROPS.imageSrc}
        imageAlt={PROPS.imageAlt}
        imageHeight={PROPS.imageHeight}
        imageWidth={PROPS.imageWidth}
        backgroundColor={PROPS.backgroundColor}
        tooltip={PROPS.tooltipText}
      />
    )

    const image = screen.getByRole('img')

    await waitFor(() => {
      expect(image).toBeInTheDocument()
      expect(image.getAttribute('src')).toBe(PROPS.imageSrc)
    })
  })

  it('should render a tooltip in hover', async () => {
    render(
      <ImageIcon
        imageSrc={PROPS.imageSrc}
        imageAlt={PROPS.imageAlt}
        imageHeight={PROPS.imageHeight}
        imageWidth={PROPS.imageWidth}
        backgroundColor={PROPS.backgroundColor}
        tooltip={PROPS.tooltipText}
      />
    )

    const image = screen.getByRole('img')
    userEvent.hover(image.parentElement!)

    const tooltip = screen.getByText(/Acolhimento/)
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveStyleRule(`visibility: visible`)
  })

  it('should not render a tooltip when is not hover', () => {
    render(
      <ImageIcon
        imageSrc={PROPS.imageSrc}
        imageAlt={PROPS.imageAlt}
        imageHeight={PROPS.imageHeight}
        imageWidth={PROPS.imageWidth}
        backgroundColor={PROPS.backgroundColor}
        tooltip={PROPS.tooltipText}
      />
    )

    const tooltip = screen.getByText(/Acolhimento/)
    expect(tooltip).toBeInTheDocument()
    expect(tooltip).toHaveStyleRule(`visibility: hidden`)
  })
})
