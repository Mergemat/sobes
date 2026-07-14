import type { Employee } from '@contracts'
import { Eyebrow } from '@/shared/ui'
import { EmployeeCard } from './employee-card'
import styles from './home.module.css'

export function EmployeeList({ employees }: { employees: Employee[] }) {
  return (
    <section aria-labelledby="team-title">
      <div className={styles.sectionHeading}>
        <div>
          <Eyebrow>Команда</Eyebrow>
          <h2 id="team-title">К кому обратиться</h2>
        </div>
      </div>
      <div className={styles.employeeGrid}>
        {employees.map((employee) => (
          <EmployeeCard employee={employee} key={employee.id} />
        ))}
      </div>
    </section>
  )
}
