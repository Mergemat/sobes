import { createBrowserRouter } from 'react-router-dom'
import { EmployeeDetailPage } from '@/pages/employee-detail'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { VacanciesPage } from '@/pages/vacancies'
import { VacancyDetailPage } from '@/pages/vacancy-detail'
import { AppLayout } from './app-layout'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/vacancies', element: <VacanciesPage /> },
      { path: '/vacancies/:vacancyId', element: <VacancyDetailPage /> },
      { path: '/employees/:employeeId', element: <EmployeeDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
