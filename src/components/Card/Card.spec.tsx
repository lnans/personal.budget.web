import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import Card from './Card'

describe('● Render:', () => {
  test('[default] → should render childs', () => {
    render(
      <Card>
        <button>test</button>
      </Card>
    )

    const button = screen.getByText('test')

    expect(button).toBeDefined()
  })
})
