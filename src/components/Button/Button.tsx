import './Button.scss'

import clsx from 'clsx'
import { ReactNode } from 'react'

export type Color = 'primary' | 'success' | 'warning' | 'error'
type Props = {
  children: ReactNode
  color?: Color
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  small?: boolean
  outlined?: boolean
  onClick?: () => void
}

function Button({
  children,
  color = 'primary',
  disabled,
  loading,
  fullWidth,
  small,
  outlined,
  onClick,
}: Props) {
  const btnClasses = clsx({
    btn: true,
    'btn--loading': loading,
    'btn--disabled': disabled,
    'btn--full': fullWidth,
    'btn--small': small,
    'btn--outlined': outlined,
    [`btn--${color}`]: true,
  })

  return (
    <button
      className={btnClasses}
      disabled={disabled || loading}
      onClick={onClick}
      data-testid='btn'
    >
      <div className='btn__content'>{children}</div>
      <div className='btn__loader' />
    </button>
  )
}

export default Button
