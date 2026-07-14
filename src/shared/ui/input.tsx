import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'
import styles from './input.module.css'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Input({ id: externalId, label, className = '', ...props }: InputProps) {
  const generatedId = useId()
  const id = externalId ?? generatedId

  return (
    <input
      className={`${styles.input} ${className}`.trim()}
      id={id}
      aria-label={label}
      {...props}
    />
  )
}
