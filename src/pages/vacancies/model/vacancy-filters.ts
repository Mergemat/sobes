import { parseAsString, useQueryStates } from 'nuqs'
import { useDebouncedValue } from '@/shared/lib'

const vacancyParsers = {
  q: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
}

export function useVacancyFilters() {
  const [filters, setFilters] = useQueryStates(vacancyParsers, { history: 'replace' })
  const search = useDebouncedValue(filters.q, 300)

  return {
    filters,
    query: search.value.trim(),
    isDebouncing: search.isPending,
    setQuery: (q: string) => setFilters({ q }),
    clearQuery: () => {
      search.flush('')
      return setFilters({ q: '' })
    },
    setCategory: (category: string) => setFilters({ category }, { scroll: true }),
  }
}
