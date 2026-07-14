import { queryOptions } from '@tanstack/react-query'
import type { Vacancy } from '@contracts'
import { apiClient } from '@/shared/api'

export const vacancyQuery = (id: number) =>
  queryOptions({
    queryKey: ['vacancies', 'detail', id],
    queryFn: () => apiClient<Vacancy>(`/api/vacancies/${id}`),
    enabled: Number.isInteger(id),
  })
