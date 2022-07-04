import * as S from './styles'
import Acolhimento from '../../../../public/assets/volunteer/services/acolhimentoIcon.png'
import CoachingEstudos from '../../../../public/assets/volunteer/services/coachingEstudosIcon.png'
import OrientacaoVocacional from '../../../../public/assets/volunteer/services/orientacaoVocacionalIcon.png'

export const FrentesInfo = [
  {
    id: 0,
    value: 'orientacao',
    text: 'Orientação vocacional',
    icon: <S.StyledSchool className="frente" />,
    imageAlt: 'Orientação Vocacional',
    imageSrc: OrientacaoVocacional.src,
    backgroundColor: '#F1FAFF'
  },
  {
    id: 1,
    value: 'coaching',
    text: 'Coaching de estudos',
    icon: <S.StyledAutoStories className="frente" />,
    imageAlt: 'Coaching de Estudos',
    imageSrc: CoachingEstudos.src,
    backgroundColor: '#E8FFF3'
  },
  {
    id: 2,
    value: 'acolhimento',
    text: 'Acolhimento',
    icon: <S.StyledVolunteerActivism className="frente" />,
    imageAlt: 'Acolhimento',
    imageSrc: Acolhimento.src,
    backgroundColor: '#F8F5FF'
  }
]
