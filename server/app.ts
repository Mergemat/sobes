import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import type { ApiError } from '../contracts'
import { employees, vacancies } from './seed'
import { getVacancies } from './vacancy-store'

const api = new Hono().basePath('/api')

api.use('*', async (context, next) => {
  await delay(200)
  await next()
  context.header('Cache-Control', 'no-store')
})

api.get('/vacancies', (context) => {
  const query = context.req.query()
  return context.json(
    getVacancies({
      cursor: Number(query.cursor ?? 0),
      limit: Number(query.limit ?? 10),
      query: query.q,
      category: query.category,
    }),
  )
})

api.get('/vacancies/:id{[0-9]+}', (context) => {
  const vacancy = vacancies.find(({ id }) => id === Number(context.req.param('id')))
  return vacancy
    ? context.json(vacancy)
    : context.json({ message: 'Вакансия не найдена' } satisfies ApiError, 404)
})

api.get('/employees', (context) => context.json(employees))

api.get('/employees/:id{[0-9]+}', (context) => {
  const employee = employees.find(({ id }) => id === Number(context.req.param('id')))
  return employee
    ? context.json(employee)
    : context.json({ message: 'Сотрудник не найден' } satisfies ApiError, 404)
})

api.all('*', (context) => context.json({ message: 'Ресурс не найден' } satisfies ApiError, 404))

const dist = fileURLToPath(new URL('../dist/', import.meta.url))

const app = new Hono()
  .route('/', api)
  .use('*', serveStatic({ root: dist }))
  .get('*', serveStatic({ path: `${dist}/index.html` }))

export default app
