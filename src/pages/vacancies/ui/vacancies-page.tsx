import { useInfiniteQuery } from '@tanstack/react-query'
import { Eyebrow, Page, PageTitle } from '@/shared/ui'
import { vacancyQueries } from '../api/vacancies'
import { useVacancyFilters } from '../model/vacancy-filters'
import { VacancyFilters } from './vacancy-filters'
import { VacancyResults } from './vacancy-results'
import { VacancySearch } from './vacancy-search'
import styles from './vacancies.module.css'

export function VacanciesPage() {
  const { filters, query, isDebouncing, setCategory, setQuery, clearQuery } = useVacancyFilters()
  const vacancies = useInfiniteQuery(vacancyQueries.infinite({ query, category: filters.category }))

  const pages = vacancies.data?.pages
  const firstPage = pages?.[0]

  return (
    <Page>
      <header className={styles.heading}>
        <Eyebrow>Карьера</Eyebrow>
        <PageTitle>Открытые вакансии</PageTitle>
        <p className={styles.headingDescription}>
          Найдите роль, в которой ваш опыт принесёт больше пользы.
        </p>
      </header>
      <VacancySearch
        isDebouncing={isDebouncing}
        value={filters.q}
        onChange={setQuery}
        onClear={clearQuery}
      />

      <div className={styles.layout}>
        <VacancyResults query={vacancies} />

        <VacancyFilters
          categories={firstPage?.categories ?? []}
          value={filters.category}
          onChange={setCategory}
        />
      </div>
    </Page>
  )
}
