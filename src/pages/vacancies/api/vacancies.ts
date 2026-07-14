import { infiniteQueryOptions, keepPreviousData } from '@tanstack/react-query'
import type { VacancyPage } from '@contracts'
import { apiClient } from '@/shared/api'

type VacancyFilters = { query: string; category: string }

export const vacancyQueries = {
  all: () => ['vacancies'] as const,
  lists: () => [...vacancyQueries.all(), 'list'] as const,
  infinite: ({ query, category }: VacancyFilters) =>
    infiniteQueryOptions({
      queryKey: [...vacancyQueries.lists(), 'infinite', query, category],
      queryFn: ({ pageParam }) => {
        const search = new URLSearchParams({ cursor: String(pageParam), limit: '10' })
        if (query) search.set('q', query)
        if (category) search.set('category', category)
        return apiClient<VacancyPage>(`/api/vacancies?${search}`)
      },
      initialPageParam: 0,
      getNextPageParam: ({ nextCursor }) => nextCursor ?? undefined,
      placeholderData: keepPreviousData,
    }),
}
