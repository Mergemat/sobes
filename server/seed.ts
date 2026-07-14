import type { Employee, Vacancy } from '../contracts'

const vacancyTemplates = [
  {
    title: 'Frontend Developer',
    category: 'IT / Development',
    amount: 1,
    salary: 150_000,
    on_replacement: false,
  },
  {
    title: 'Accountant',
    category: 'Finance / Accounting',
    amount: 2,
    salary: 50_000,
    on_replacement: true,
  },
  {
    title: 'Sales Manager',
    category: 'Sales / B2B',
    amount: 3,
    salary: 80_000,
    on_replacement: false,
  },
  {
    title: 'Office Manager',
    category: 'Administrative Staff',
    amount: 1,
    salary: 45_000,
    on_replacement: true,
  },
  {
    title: 'Data Analyst',
    category: 'Analytics',
    amount: 1,
    salary: 180_000,
    on_replacement: false,
  },
] as const

const locations = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Удалённо']

export const vacancies: Vacancy[] = Array.from({ length: 45 }, (_, index) => {
  const template = vacancyTemplates[index % vacancyTemplates.length]
  const location = locations[Math.floor(index / vacancyTemplates.length) % locations.length]

  return {
    id: index + 1,
    ...template,
    title: index < vacancyTemplates.length ? template.title : `${template.title} · ${location}`,
    description: `Ищем специалиста в направление «${template.category}». Задачи понятные, команда небольшая, решения принимаются быстро.`,
    requirements: ['Опыт работы от 2 лет', 'Самостоятельность', 'Умение работать в команде'],
  }
})

export const employees: Employee[] = [
  {
    id: 1,
    name: 'Анна Смирнова',
    role: 'Head of Product',
    department: 'Product',
    email: 'anna.smirnova@example.com',
    bio: 'Отвечает за продуктовую стратегию и помогает командам превращать идеи в измеримый результат.',
    skills: ['Product strategy', 'Discovery', 'Leadership'],
  },
  {
    id: 2,
    name: 'Михаил Волков',
    role: 'Engineering Manager',
    department: 'Engineering',
    email: 'mikhail.volkov@example.com',
    bio: 'Развивает инженерные практики, архитектуру и культуру обратной связи внутри команды.',
    skills: ['Architecture', 'Mentoring', 'Delivery'],
  },
  {
    id: 3,
    name: 'Елена Ким',
    role: 'People Partner',
    department: 'People',
    email: 'elena.kim@example.com',
    bio: 'Помогает сотрудникам расти, а руководителям — строить здоровые и устойчивые команды.',
    skills: ['People operations', 'Coaching', 'Hiring'],
  },
]
