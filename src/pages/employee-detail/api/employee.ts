import { queryOptions } from '@tanstack/react-query'
import type { Employee } from '@contracts'
import { apiClient } from '@/shared/api'

export const employeeQuery = (id: number) =>
  queryOptions({
    queryKey: ['employees', 'detail', id],
    queryFn: () => apiClient<Employee>(`/api/employees/${id}`),
    enabled: Number.isInteger(id),
  })
