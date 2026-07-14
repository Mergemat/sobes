import { describe, expect, test } from 'vitest'
import type { VacancyPage } from '../contracts'
import app from './app'

describe('vacancy API contract', () => {
  test('combines normalized search, category and cursor pagination without duplicates', async () => {
    const filters = 'limit=2&q=%20%20FRONTEND%20%20&category=IT%20%2F%20Development'
    const firstResponse = await app.request(`/api/vacancies?${filters}`)
    const first = (await firstResponse.json()) as VacancyPage
    const secondResponse = await app.request(`/api/vacancies?${filters}&cursor=${first.nextCursor}`)
    const second = (await secondResponse.json()) as VacancyPage

    expect([firstResponse.status, secondResponse.status]).toEqual([200, 200])
    expect(first.total).toBe(9)
    expect(first.items).toHaveLength(2)
    expect(second.items).toHaveLength(2)
    expect(new Set([...first.items, ...second.items].map(({ id }) => id)).size).toBe(4)
    expect(
      [...first.items, ...second.items].every(
        ({ category, title }) =>
          category === 'IT / Development' && title.toLowerCase().includes('frontend'),
      ),
    ).toBe(true)
  })

  test('keeps unknown API routes JSON while client routes receive the SPA', async () => {
    const apiResponse = await app.request('/api/unknown')
    const pageResponse = await app.request('/vacancies/999')

    expect(apiResponse.status).toBe(404)
    expect(apiResponse.headers.get('content-type')).toContain('application/json')
    expect(await apiResponse.json()).toEqual({ message: 'Ресурс не найден' })
    expect(pageResponse.status).toBe(200)
    expect(await pageResponse.text()).toContain('<div id="root"></div>')
  })
})
