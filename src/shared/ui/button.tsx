import type { ButtonHTMLAttributes } from 'react'
import styles from './button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'plain'
}

export function Button({ className = '', variant = 'primary', ...props }: ButtonProps) {
  return <button className={`${styles.root} ${styles[variant]} ${className}`.trim()} {...props} />
}
