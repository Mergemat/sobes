import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import styles from './page.module.css'

export function Page({ className = '', ...props }: ComponentPropsWithoutRef<'main'>) {
  return <main className={`${styles.page} ${className}`.trim()} {...props} />
}

export function PageTitle({ className = '', ...props }: ComponentPropsWithoutRef<'h1'>) {
  return <h1 className={`${styles.title} ${className}`.trim()} {...props} />
}

export function Eyebrow({ children }: PropsWithChildren) {
  return <p className={styles.eyebrow}>{children}</p>
}

export function LoadingMessage({ children }: PropsWithChildren) {
  return <p className={styles.loading}>{children}</p>
}
