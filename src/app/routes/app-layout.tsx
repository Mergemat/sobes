import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './app-header'

export function AppLayout() {
  return (
    <NuqsAdapter>
      <AppHeader />
      <Outlet />
    </NuqsAdapter>
  )
}
