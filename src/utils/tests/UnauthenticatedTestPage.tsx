import { unauthenticatedRoute } from '../authentication/unauthenticatedRoute'

function TestPage() {
  return <p>Página Padrão</p>
}

export default unauthenticatedRoute(TestPage)
