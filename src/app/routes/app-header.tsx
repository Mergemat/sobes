import { NavLink } from 'react-router-dom'
import styles from './app-header.module.css'

const navClassName = ({ isActive }: { isActive: boolean }) =>
  `${styles.link} ${isActive ? styles.active : ''}`.trim()

export function AppHeader() {
  return (
    <header className={styles.header}>
      <NavLink className={styles.brand} to="/">
        Команда
      </NavLink>
      <nav className={styles.navigation} aria-label="Основная навигация">
        <NavLink className={navClassName} end to="/">
          Главная
        </NavLink>
        <NavLink className={navClassName} to="/vacancies">
          Вакансии
        </NavLink>
      </nav>
    </header>
  )
}
