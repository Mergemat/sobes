import styles from './tag.module.css'

type TagProps = {
  children: React.ReactNode
  tone?: 'accent' | 'neutral'
}

export function Tag({ children, tone = 'accent' }: TagProps) {
  return <span className={`${styles.root} ${styles[tone]}`}>{children}</span>
}
