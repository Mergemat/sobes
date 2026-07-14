import { Button } from '@/shared/ui'
import styles from './vacancies.module.css'

type VacancyFiltersProps = {
  categories: string[]
  value: string
  onChange: (category: string) => void
}

export function VacancyFilters({ categories, value, onChange }: VacancyFiltersProps) {
  return (
    <aside className={styles.filters} aria-label="Фильтр по категории">
      <strong className={styles.controlLabel}>Категории</strong>
      <div className={styles.filterOptions}>
        <Button
          variant="plain"
          className={styles.filterButton}
          onClick={() => onChange('')}
          aria-pressed={!value}
        >
          Все
        </Button>
        {categories.map((category) => (
          <Button
            variant="plain"
            className={styles.filterButton}
            key={category}
            onClick={() => onChange(category)}
            aria-pressed={value === category}
          >
            {category}
          </Button>
        ))}
      </div>
    </aside>
  )
}
