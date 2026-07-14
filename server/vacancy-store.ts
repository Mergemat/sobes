import type { VacancyPage } from '../contracts'
import { vacancies } from './seed'

export type VacancyFilters = {
  cursor?: number
  limit?: number
  query?: string
  category?: string
}

export const categories = [...new Set(vacancies.map(({ category }) => category))]

export function getVacancies({
  cursor = 0,
  limit = 10,
  query = '',
  category = '',
}: VacancyFilters): VacancyPage {
  const normalizedQuery = query.trim().toLocaleLowerCase('ru-RU')
  const safeCursor = Math.max(0, cursor)
  const safeLimit = Math.min(20, Math.max(1, limit))
  const filtered = vacancies.filter((vacancy) => {
    const matchesCategory = !category || vacancy.category === category
    const haystack = `${vacancy.title} ${vacancy.category}`.toLocaleLowerCase('ru-RU')
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery))
  })
  const items = filtered.slice(safeCursor, safeCursor + safeLimit)
  const nextCursor = safeCursor + items.length

  return {
    items,
    nextCursor: nextCursor < filtered.length ? nextCursor : null,
    total: filtered.length,
    categories,
  }
}
