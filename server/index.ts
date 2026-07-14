import { serve } from '@hono/node-server'
import app from './app'

serve(
  {
    port: Number(process.env.PORT ?? 3001),
    fetch: app.fetch,
  },
  ({ port }) => console.log(`Server: http://localhost:${port}`),
)
