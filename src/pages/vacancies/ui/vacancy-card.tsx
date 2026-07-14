import type { Vacancy } from '@contracts'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@/shared/lib'
import { Tag } from '@/shared/ui'
import styles from './vacancies.module.css'

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  return (
    <article className={styles.card}>
      <div>
        <Tag>{vacancy.category}</Tag>
        {vacancy.on_replacement ? <Tag tone="neutral">На замену</Tag> : null}
      </div>
      <h2>
        <Link to={`/vacancies/${vacancy.id}`}>{vacancy.title}</Link>
      </h2>
      <p>{vacancy.description}</p>
      <footer>
        <strong>{formatCurrency(vacancy.salary)}</strong>
        <span>Позиций: {vacancy.amount}</span>
      </footer>
    </article>
  )
}
