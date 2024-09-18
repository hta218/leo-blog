import { clsx } from 'clsx'
import type { CSSProperties } from 'react'

export function GrowingUnderline({
  as: Component = 'span',
  children,
  className,
  duration,
  ...rest
}: {
  children: React.ReactNode
  as?: React.ElementType
  className?: string
  duration?: number
  [key: string]: any
}) {
  return (
    <Component
      className={clsx([
        'bg-gradient-to-r bg-left-bottom bg-no-repeat',
        'transition-[background-size] duration-[var(--duration,300ms)]',
        'bg-[length:0px_50%] hover:bg-[length:100%_50%]',
        'from-green-200 to-green-100',
        'dark:from-lime-800 dark:to-lime-900',
        className,
      ])}
      style={{ '--duration': `${duration || 300}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Component>
  )
}
