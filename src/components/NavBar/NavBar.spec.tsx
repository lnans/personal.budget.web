import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { Ri4KFill } from 'react-icons/ri'

import NavBar from './NavBar'

const routes = {
  home: {
    Icon: Ri4KFill,
    path: '/',
    name: 'home',
  },
  accounts: {
    Icon: Ri4KFill,
    path: '/accounts',
    name: 'accounts',
  },
}

describe('● Render:', () => {
  test('[default] → should render navbar with items', () => {
    const onNavigate = vi.fn()
    render(<NavBar currentPath='/' routes={routes} onNavigate={onNavigate} />)

    const navBar = screen.queryByTestId('nav')
    const links = screen.queryAllByTestId('navbar-link-item')

    expect(navBar).toBeTruthy()
    expect(navBar).toBeInTheDocument()
    expect(links).toBeTruthy()
    expect(links.length).toBe(2)
    expect(onNavigate).not.toHaveBeenCalled()
  })
})

describe('● When user navigate', () => {
  test('[default] → should trigger onNavigate fonction with path ', async () => {
    const onNavigate = vi.fn()
    render(<NavBar currentPath='/' routes={routes} onNavigate={(path) => onNavigate(path)} />)

    const links = await screen.findAllByTestId('navbar-link-item')

    fireEvent.click(links[1])

    expect(onNavigate).toHaveBeenCalledWith('/accounts')
  })
})
