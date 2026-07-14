import { ActionLink, Eyebrow, PageTitle } from '@/shared/ui'
import styles from './home.module.css'

export function HomeHero() {
  return (
    <section className={styles.hero}>
      <Eyebrow>Внутренний портал</Eyebrow>
      <PageTitle>
        Люди и открытые роли
        <br />в одном месте.
      </PageTitle>
      <ActionLink to="/vacancies">Смотреть вакансии →</ActionLink>
    </section>
  )
}
