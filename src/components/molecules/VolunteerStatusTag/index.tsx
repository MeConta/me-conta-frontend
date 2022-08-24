import Tag from 'components/atoms/Tag'
import theme from 'styles/theme'

export type ApprovalStatus = 'Aberto' | 'Aprovado' | 'Reprovado'

type VolunteerStatusTagProps = {
  status: ApprovalStatus
}

export default function VolunteerStatusTag({
  status
}: VolunteerStatusTagProps) {
  const tagAttributes = {
    Aberto: {
      titleColor: theme.colors.harvestGold,
      backgroundColor: theme.colors.blondYellow
    },
    Aprovado: {
      titleColor: theme.colors.emerald,
      backgroundColor: theme.colors.honeydew
    },
    Reprovado: {
      titleColor: theme.colors.maroonFlush,
      backgroundColor: theme.colors.mistyRose
    }
  }

  return (
    <Tag
      title={status}
      titleColor={tagAttributes[status].titleColor}
      backgroundColor={tagAttributes[status].backgroundColor}
      data-testid="volunteer-status-tag"
    />
  )
}
