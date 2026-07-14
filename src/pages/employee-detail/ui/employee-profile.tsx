import type { Employee } from '@contracts'
import { Link } from 'react-router-dom'
import { ActionLink, Eyebrow, Page, PageTitle, Tag } from '@/shared/ui'
import styles from './employee-profile.module.css'

export function EmployeeProfile({ employee }: { employee: Employee }) {
  return (
    <Page>
      <Link className={styles.backLink} to="/">
        ← На главную
      </Link>
      <article className={styles.article}>
        <span className={styles.avatar} aria-hidden="true">
          {employee.name.slice(0, 1)}
        </span>
        <Eyebrow>{employee.department}</Eyebrow>
        <PageTitle>{employee.name}</PageTitle>
        <p className={styles.lead}>{employee.role}</p>
        <p className={styles.bio}>{employee.bio}</p>
        <h2 className={styles.sectionTitle}>Экспертиза</h2>
        <div className={styles.tagList}>
          {employee.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
        <div className={styles.action}>
          <ActionLink href={`mailto:${employee.email}`}>Написать сотруднику</ActionLink>
        </div>
      </article>
    </Page>
  )
}
