import type { Employee } from '@contracts'
import { Link } from 'react-router-dom'
import styles from './home.module.css'

export function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <Link className={styles.employeeCard} to={`/employees/${employee.id}`}>
      <span className={styles.avatar} aria-hidden="true">
        {employee.name.slice(0, 1)}
      </span>
      <strong>{employee.name}</strong>
      <span>{employee.role}</span>
      <small>{employee.department}</small>
    </Link>
  )
}
