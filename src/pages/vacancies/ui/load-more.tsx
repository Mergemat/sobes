import { useEffect, useRef } from 'react'
import styles from './vacancies.module.css'

type LoadMoreProps = { hasMore: boolean; loading: boolean; onLoadMore: () => void }

function getMessage(hasMore: boolean, loading: boolean) {
  if (loading) return 'Загружаем ещё…'
  if (hasMore) return 'Прокрутите ниже'
  return 'Все вакансии загружены'
}

export function LoadMore({ hasMore, loading, onLoadMore }: LoadMoreProps) {
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sentinel.current
    if (!element || !hasMore) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !loading) onLoadMore()
      },
      { rootMargin: '240px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [hasMore, loading, onLoadMore])

  return (
    <div className={styles.loadMore} ref={sentinel} role="status" aria-live="polite">
      {getMessage(hasMore, loading)}
    </div>
  )
}
