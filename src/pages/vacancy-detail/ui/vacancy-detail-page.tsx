import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { LoadingMessage, Page, PageMessage } from '@/shared/ui'
import { vacancyQuery } from '../api/vacancy'
import { VacancyDetails } from './vacancy-details'

export function VacancyDetailPage() {
  const id = Number(useParams().vacancyId)
  const vacancy = useQuery(vacancyQuery(id))

  if (vacancy.isPending)
    return (
      <Page>
        <LoadingMessage>Загружаем вакансию…</LoadingMessage>
      </Page>
    )
  if (vacancy.isError)
    return (
      <Page>
        <PageMessage
          title="Вакансия не найдена"
          action={<Link to="/vacancies">К списку вакансий</Link>}
        />
      </Page>
    )

  return <VacancyDetails vacancy={vacancy.data} />
}
