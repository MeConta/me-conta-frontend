import { render, screen } from '../../../utils/tests/helpers'
import { CheckboxGroup } from '.'
import userEvent from '@testing-library/user-event'

describe('<CheckboxGroup />', () => {
  const onChangeMock = jest.fn()
  const errorMessage = 'Este campo é obrigatório'

  const optionLabels = {
    FIRST_OPTION: 'Primeira Opção',
    SECOND_OPTION: 'Segunda Opção',
    THIRD_OPTION: 'Terceira Opção'
  }

  const options = [
    {
      label: optionLabels.FIRST_OPTION,
      value: 0
    },
    {
      label: optionLabels.SECOND_OPTION,
      value: 1
    },
    {
      label: optionLabels.THIRD_OPTION,
      value: 2
    }
  ]

  const getCheckboxByLabel = (label: string) =>
    screen.getByRole('checkbox', { name: label })

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

  it('should create array from selected options and pass it to onChange', () => {
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

    userEvent.click(getCheckboxByLabel(optionLabels.FIRST_OPTION))
    expect(onChangeMock).toHaveBeenCalledWith([0])

    userEvent.click(getCheckboxByLabel(optionLabels.SECOND_OPTION))
    expect(onChangeMock).toHaveBeenCalledWith([0, 1])
  })

  it('should remove option from the array after unchecking', () => {
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

    userEvent.click(getCheckboxByLabel(optionLabels.FIRST_OPTION))
    expect(onChangeMock).toHaveBeenCalledWith([0])

    userEvent.click(getCheckboxByLabel(optionLabels.SECOND_OPTION))
    expect(onChangeMock).toHaveBeenCalledWith([0, 1])

    userEvent.click(getCheckboxByLabel(optionLabels.FIRST_OPTION))
    expect(onChangeMock).toHaveBeenCalledWith([1])
  })

  it('should render fields already checked according to default values', () => {
    render(
      <CheckboxGroup
        name="checkbox"
        value={[0, 2]}
        options={options}
        required
        error={errorMessage}
        label="checkbox-label"
        onChange={onChangeMock}
      />
    )

    expect(getCheckboxByLabel(optionLabels.FIRST_OPTION)).toBeChecked()
    expect(getCheckboxByLabel(optionLabels.SECOND_OPTION)).not.toBeChecked()
    expect(getCheckboxByLabel(optionLabels.THIRD_OPTION)).toBeChecked()
  })
})
