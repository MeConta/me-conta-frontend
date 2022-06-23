import { render, screen } from '../../../utils/tests/helpers'
import React from 'react'
import Tag from './index'

const TAGPROPS = {
  title: 'Aberto',
  titleColor: '#DE8A0B',
  backgroundColor: '#FFF0C4'
}

describe('<Tag />', () => {
  it("should render a Tag with correct title's text and font color", () => {
    render(
      <Tag
        title={TAGPROPS.title}
        titleColor={TAGPROPS.titleColor}
        backgroundColor={TAGPROPS.backgroundColor}
      />
    )

    const tagText = screen.getByText(/Aberto/)

    expect(tagText).toBeInTheDocument()
    expect(tagText.parentElement).toHaveStyle(`color: ${TAGPROPS.titleColor}`)
  })

  it('should render Tag with correct background color', () => {
    render(
      <Tag
        title={TAGPROPS.title}
        titleColor={TAGPROPS.titleColor}
        backgroundColor={TAGPROPS.backgroundColor}
      />
    )

    const tag = screen.getByText(/Aberto/).parentElement

    expect(tag).toHaveStyle(
      `background-color: ${TAGPROPS.backgroundColor};
      color: ${TAGPROPS.titleColor}`
    )
  })
})
