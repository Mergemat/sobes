import { Input } from '@/shared/ui'
import styles from './vacancies.module.css'

type VacancySearchProps = {
  isDebouncing: boolean
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

function SearchAction({
  isDebouncing,
  hasValue,
  onClear,
}: {
  isDebouncing: boolean
  hasValue: boolean
  onClear: () => void
}) {
  if (isDebouncing)
    return (
      <span role="status" aria-label="Идёт поиск" aria-live="polite">
        <span className={styles.searchLoader} aria-hidden="true" />
      </span>
    )

  if (!hasValue) return null

  return (
    <button
      className={styles.searchClear}
      type="button"
      onClick={onClear}
      aria-label="Очистить поиск"
    >
      <span aria-hidden="true">×</span>
    </button>
  )
}

export function VacancySearch({ isDebouncing, value, onChange, onClear }: VacancySearchProps) {
  return (
    <div className={styles.search}>
      <strong className={styles.controlLabel}>Поиск</strong>
      <div className={styles.searchControl}>
        <Input
          label="Поиск вакансий"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Название или категория"
          className={styles.searchInput}
        />
        <span className={styles.searchAction}>
          <SearchAction isDebouncing={isDebouncing} hasValue={Boolean(value)} onClear={onClear} />
        </span>
      </div>
    </div>
  )
}
