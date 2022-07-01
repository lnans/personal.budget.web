import './Card.scss'

import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  width?: string
}

function Card({ children, width = '400px' }: Props) {
  return (
    <div className='card' style={{ width: width }}>
      {children}
    </div>
  )
}

export default Card
