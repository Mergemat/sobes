import type { Vacancy } from '@contracts'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@/shared/lib'
import { Page, PageTitle, Tag } from '@/shared/ui'
import styles from './vacancy-details.module.css'

export function VacancyDetails({ vacancy }: { vacancy: Vacancy }) {
  return (
    <Page>
      <Link className={styles.backLink} to="/vacancies">
        ← Все вакансии
      </Link>
      <article className={styles.article}>
        <Tag>{vacancy.category}</Tag>
        <PageTitle>{vacancy.title}</PageTitle>
        <p className={styles.lead}>{vacancy.description}</p>
        <dl className={styles.facts}>
          <div>
            <dt>Зарплата</dt>
            <dd>{formatCurrency(vacancy.salary)}</dd>
          </div>
          <div>
            <dt>Открытых позиций</dt>
            <dd>{vacancy.amount}</dd>
          </div>
          <div>
            <dt>Тип</dt>
            <dd>{vacancy.on_replacement ? 'На замену' : 'Новая позиция'}</dd>
          </div>
        </dl>
        <h2 className={styles.sectionTitle}>Что важно</h2>
        <ul>
          {vacancy.requirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      </article>
    </Page>
  )
}
