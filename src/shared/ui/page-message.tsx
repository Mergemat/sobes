import styles from './page-message.module.css'

type PageMessageProps = {
  title: string
  children?: React.ReactNode
  action?: React.ReactNode
}

export function PageMessage({ title, children, action }: PageMessageProps) {
  return (
    <section className={styles.root}>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </section>
  )
}
