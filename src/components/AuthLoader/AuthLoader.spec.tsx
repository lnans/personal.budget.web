import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import AuthLoader from './AuthLoader'

describe('● Render:', () => {
  test('[default] → should display loader', async () => {
    render(<AuthLoader />)

    const loader = await screen.findByTestId('auth-loader')

    expect(loader).toBeInTheDocument()
  })
})
