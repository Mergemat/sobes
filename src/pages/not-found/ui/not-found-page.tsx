import { Link } from 'react-router-dom'
import { Page, PageMessage } from '@/shared/ui'

export function NotFoundPage() {
  return (
    <Page>
      <PageMessage title="Страница не найдена" action={<Link to="/">На главную</Link>} />
    </Page>
  )
}
