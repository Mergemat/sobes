import type { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import styles from './action-link.module.css'

type ActionLinkProps = PropsWithChildren<
  { to: string; href?: never } | { href: string; to?: never }
>

export function ActionLink({ children, ...destination }: ActionLinkProps) {
  return 'to' in destination ? (
    <Link className={styles.root} to={destination.to}>
      {children}
    </Link>
  ) : (
    <a className={styles.root} href={destination.href}>
      {children}
    </a>
  )
}
