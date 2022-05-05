import { render, screen } from '../../../utils/tests/helpers'
import { CheckboxGroup } from '.'
import userEvent from '@testing-library/user-event'

describe('<CheckboxGroup />', () => {
  const onChangeMock = jest.fn()
  const errorMessage = 'Este campo é obrigatório'

  const options = [
    {
      label: 'Primeira Opção',
      value: 0
    },
    {
      label: 'Segunda Opção',
      value: 1
    },
    {
      label: 'Terceira Opção',
      value: 2
    }
  ]

  it('should render CheckboxGroup with a label', () => {
    render(
      <CheckboxGroup
        name="checkbox"
        options={options}
        label="checkbox-label"
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText('checkbox-label')).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
  })

  it('should render CheckboxGroup with a subtitle', () => {
    render(
      <CheckboxGroup
        name="checkbox"
        options={options}
        label="checkbox-label"
        subtitle="(checkbox-subtitle)"
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText('checkbox-label')).toBeInTheDocument()
    expect(screen.getByText('(checkbox-subtitle)')).toBeInTheDocument()
  })

  it('should have required attribute when required prop is true', () => {
    render(
      <CheckboxGroup
        name="checkbox"
        options={options}
        required
        label="checkbox-label"
        onChange={onChangeMock}
      />
    )

    expect(screen.getByTestId('checkbox-label')).toHaveAttribute(
      'aria-required',
      'true'
    )
  })

  it('should render error message', () => {
    const errorMessage = 'Error message'
    render(
      <CheckboxGroup
        name="checkbox"
        options={options}
        required
        error={errorMessage}
        label="checkbox-label"
        onChange={onChangeMock}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('should pass onChange function to children', () => {
    render(
      <CheckboxGroup
        name="checkbox"
        options={options}
        required
        error={errorMessage}
        label="checkbox-label"
        onChange={onChangeMock}
      />
    )

    userEvent.click(screen.getByRole('checkbox', { name: 'Primeira Opção' }))
    expect(onChangeMock).toHaveBeenCalled()
  })
})
