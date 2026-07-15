import { useInfiniteQuery } from '@tanstack/react-query'
import { Button, Eyebrow, LoadingMessage, Page, PageMessage, PageTitle } from '@/shared/ui'
import { vacancyQueries } from '../api/vacancies'
import { useVacancyFilters } from '../model/vacancy-filters'
import { LoadMore } from './load-more'
import { VacancyFilters } from './vacancy-filters'
import { VacancyList } from './vacancy-list'
import { VacancySearch } from './vacancy-search'
import styles from './vacancies.module.css'

export function VacanciesPage() {
  const { filters, query, isDebouncing, setCategory, setQuery, clearQuery } = useVacancyFilters()
  const vacancies = useInfiniteQuery(vacancyQueries.infinite({ query, category: filters.category }))

  const pages = vacancies.data?.pages
  const items = pages?.flatMap((page) => page.items) ?? []
  const firstPage = pages?.[0]
  const isUpdating = vacancies.isFetching && !vacancies.isPending && !vacancies.isFetchingNextPage

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
        <section aria-label="Список вакансий" aria-busy={isUpdating}>
          <div className={styles.listHeading}>
            <strong className={styles.controlLabel}>Вакансии</strong>
            <div className={styles.resultMeta}>
              {isUpdating ? (
                <span className={styles.updating} role="status" aria-live="polite">
                  <span className={styles.searchLoader} aria-hidden="true" />
                  Обновляем…
                </span>
              ) : null}
              {firstPage ? <span>Найдено: {firstPage.total}</span> : null}
            </div>
          </div>
          {vacancies.isPending ? <LoadingMessage>Ищем подходящие вакансии…</LoadingMessage> : null}
          {vacancies.isError ? (
            <PageMessage
              title="Не удалось загрузить вакансии"
              action={<Button onClick={() => vacancies.refetch()}>Повторить</Button>}
            />
          ) : null}
          {firstPage && items.length === 0 ? (
            <PageMessage title="Ничего не найдено">
              Попробуйте изменить поиск или категорию.
            </PageMessage>
          ) : null}
          {firstPage ? <VacancyList items={items} /> : null}
          {firstPage && items.length > 0 ? (
            <LoadMore
              hasMore={Boolean(vacancies.hasNextPage)}
              loading={vacancies.isFetchingNextPage}
              onLoadMore={() => void vacancies.fetchNextPage()}
            />
          ) : null}
        </section>

        <VacancyFilters
          categories={firstPage?.categories ?? []}
          value={filters.category}
          onChange={setCategory}
        />
      </div>
    </Page>
  )
}
