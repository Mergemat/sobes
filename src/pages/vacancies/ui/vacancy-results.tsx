import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query'
import type { Vacancy, VacancyPage } from '@contracts'
import { Button, LoadingMessage, PageMessage } from '@/shared/ui'
import { LoadMore } from './load-more'
import { VacancyList } from './vacancy-list'
import styles from './vacancies.module.css'

type VacancyQueryResult = UseInfiniteQueryResult<InfiniteData<VacancyPage>>

function ResultMeta({ total, isUpdating }: { total?: number; isUpdating: boolean }) {
  if (total === undefined) return null

  return (
    <div className={styles.resultMeta}>
      {isUpdating && (
        <span className={styles.updating} role="status" aria-live="polite">
          <span className={styles.searchLoader} aria-hidden="true" />
          Обновляем…
        </span>
      )}
      <span>Найдено: {total}</span>
    </div>
  )
}

function ResultsContent({ query, items }: { query: VacancyQueryResult; items?: Vacancy[] }) {
  if (query.isPending) return <LoadingMessage>Ищем подходящие вакансии…</LoadingMessage>

  if (query.isError)
    return (
      <PageMessage
        title="Не удалось загрузить вакансии"
        action={<Button onClick={() => void query.refetch()}>Повторить</Button>}
      />
    )

  if (!items) return null

  if (items.length === 0)
    return (
      <PageMessage title="Ничего не найдено">Попробуйте изменить поиск или категорию.</PageMessage>
    )

  return (
    <>
      <VacancyList items={items} />
      <LoadMore
        hasMore={query.hasNextPage}
        loading={query.isFetchingNextPage}
        onLoadMore={() => void query.fetchNextPage()}
      />
    </>
  )
}

export function VacancyResults({ query }: { query: VacancyQueryResult }) {
  const pages = query.data?.pages
  const items = pages?.flatMap((page) => page.items)
  const isUpdating = query.isFetching && !query.isPending && !query.isFetchingNextPage

  return (
    <section aria-label="Список вакансий" aria-busy={isUpdating}>
      <div className={styles.listHeading}>
        <strong className={styles.controlLabel}>Вакансии</strong>
        <ResultMeta total={pages?.[0]?.total} isUpdating={isUpdating} />
      </div>
      <ResultsContent query={query} items={items} />
    </section>
  )
}
