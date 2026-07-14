export type Vacancy = {
  id: number
  title: string
  category: string
  amount: number
  salary: number
  on_replacement: boolean
  description: string
  requirements: string[]
}

export type VacancyPage = {
  items: Vacancy[]
  nextCursor: number | null
  total: number
  categories: string[]
}

export type Employee = {
  id: number
  name: string
  role: string
  department: string
  email: string
  bio: string
  skills: string[]
}

export type ApiError = { message: string }
