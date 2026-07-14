import type { ApiError } from '@contracts'

export async function apiClient<T>(path: string): Promise<T> {
  const response = await fetch(path)
  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ApiError | null
    throw new Error(error?.message ?? 'Не удалось загрузить данные')
  }
  return response.json() as Promise<T>
}
