import './Dialog.scss'

import { ReactNode } from 'react'

export type Props = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

function Dialog({ open, title, onClose, children }: Props) {
  return (
    <>
      {open && (
        <div className='dialog'>
          <div className='dialog-card'>
            <button className='dialog-card__close' onClick={onClose} data-testid='close-dialog'>
              <i className='ri-close-line'></i>
            </button>

            <div className='dialog-card__title'>{title}</div>
            <div className='dialog-card__content'>{children}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Dialog
