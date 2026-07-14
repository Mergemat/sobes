import type { Vacancy } from '@contracts'
import { VacancyCard } from './vacancy-card'
import styles from './vacancies.module.css'

export function VacancyList({ items }: { items: Vacancy[] }) {
  return (
    <div className={styles.list}>
      {items.map((vacancy) => (
        <VacancyCard key={vacancy.id} vacancy={vacancy} />
      ))}
    </div>
  )
}
