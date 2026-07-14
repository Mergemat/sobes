import { queryOptions } from '@tanstack/react-query'
import type { Employee } from '@contracts'
import { apiClient } from '@/shared/api'

export const homeQuery = queryOptions({
  queryKey: ['employees', 'list'],
  queryFn: () => apiClient<Employee[]>('/api/employees'),
})
