import Tooltip from 'components/atoms/Tooltip'
import { InfoCircle } from 'styled-icons/bootstrap'

export default function Home() {
  return (
    <div id="title-tooltip">
      <h4 className="card-header">Selecione os horários</h4>

      <Tooltip text="Fuso horário: Brasília (BRT). As sessões possuem 1h de duração.">
        <InfoCircle
          style={{ marginBottom: '2rem', marginLeft: '1rem' }}
          data-testid="tooltip"
          width={15}
          height={15}
        ></InfoCircle>
      </Tooltip>
    </div>
  )
}
