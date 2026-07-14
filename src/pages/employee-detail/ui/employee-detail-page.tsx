import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { LoadingMessage, Page, PageMessage } from '@/shared/ui'
import { employeeQuery } from '../api/employee'
import { EmployeeProfile } from './employee-profile'

export function EmployeeDetailPage() {
  const id = Number(useParams().employeeId)
  const employee = useQuery(employeeQuery(id))

  if (employee.isPending)
    return (
      <Page>
        <LoadingMessage>Загружаем профиль…</LoadingMessage>
      </Page>
    )
  if (employee.isError)
    return (
      <Page>
        <PageMessage title="Сотрудник не найден" action={<Link to="/">На главную</Link>} />
      </Page>
    )

  return <EmployeeProfile employee={employee.data} />
}
