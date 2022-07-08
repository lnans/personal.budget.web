import './Dialog.scss'

import { ReactNode } from 'react'
import { RiCloseLine } from 'react-icons/ri'

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
              <div className='dialog-card-close__icon'>
                <RiCloseLine />
              </div>
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
