import { useQuery } from '@tanstack/react-query'
import { Button, LoadingMessage, Page, PageMessage } from '@/shared/ui'
import { homeQuery } from '../api/home'
import { EmployeeList } from './employee-list'
import { HomeHero } from './home-hero'

export function HomePage() {
  const employees = useQuery(homeQuery)

  return (
    <Page>
      <HomeHero />
      {employees.isPending ? <LoadingMessage>Загружаем сотрудников…</LoadingMessage> : null}
      {employees.isError ? (
        <PageMessage
          title="Не удалось загрузить команду"
          action={<Button onClick={() => employees.refetch()}>Повторить</Button>}
        />
      ) : null}
      {employees.data ? <EmployeeList employees={employees.data} /> : null}
    </Page>
  )
}
