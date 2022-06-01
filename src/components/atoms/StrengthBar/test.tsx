import { render, screen } from 'utils/tests/helpers'
import { StrengthBar } from './index'

describe('<StrengthBar />', () => {
  const requirements = [
    new RegExp(/[a-z]/),
    new RegExp(/[A-Z]/),
    new RegExp(/\d/),
    new RegExp(/\W/)
  ]
  const scoreWords = ['fraca', 'razoável', 'forte', 'incrível']

  it('should show message "muito curta" on strength bar when the password has less than 5 characters', () => {
    render(
      <StrengthBar
        requirements={requirements}
        minLength={5}
        password={'asdd'}
        scoreWords={scoreWords}
      />
    )

    expect(screen.getByText('muito curta')).toBeInTheDocument()
  })

  it('should show message "fraca" on strength bar when the password only meets one requirement', () => {
    render(
      <StrengthBar
        requirements={requirements}
        minLength={5}
        password={'asdskjfd'}
        scoreWords={scoreWords}
      />
    )

    expect(screen.getByText('fraca')).toBeInTheDocument()
  })

  it('should show message "razoável" on strength bar when the password only meets two requirements', () => {
    render(
      <StrengthBar
        requirements={requirements}
        minLength={5}
        password={'asdskj1fd'}
        scoreWords={scoreWords}
      />
    )

    expect(screen.getByText('razoável')).toBeInTheDocument()
  })

  it('should show message "forte" on strength bar when the password meets only 3 requirements', () => {
    render(
      <StrengthBar
        requirements={requirements}
        minLength={5}
        password={'asdskj1Afd'}
        scoreWords={scoreWords}
      />
    )

    expect(screen.getByText('forte')).toBeInTheDocument()
  })

  it('should show message "incrível" on strength bar when the password meets only 3 requirements', () => {
    render(
      <StrengthBar
        requirements={requirements}
        minLength={5}
        password={'asdskj1A*fd'}
        scoreWords={scoreWords}
      />
    )

    expect(screen.getByText('incrível')).toBeInTheDocument()
  })
})
