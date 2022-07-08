import './NavBar.scss'

import { IconType } from 'react-icons'

type NavBarRoute = {
  name: string
  path: string
  Icon: IconType
}
type NavBarRoutes = {
  [key in string]: NavBarRoute
}

export type Props = {
  currentPath: string
  routes: NavBarRoutes
  onNavigate?: (path: string) => void
}

function NavBar({ currentPath, routes, onNavigate }: Props) {
  const routesArray = Object.keys(routes).map((key: string) => routes[key])
  const handleNavigation = (path: string) => {
    onNavigate && onNavigate(path)
  }
  return (
    <nav className='navbar' data-testid='nav'>
      <img className='navbar__logo' src='/logo.png' alt='app logo' />
      <div className='navbar__links'>
        {routesArray.map(({ name, path, Icon }, idx) => (
          <button
            className={currentPath === path ? 'navbar-link-item navbar-link-item--current' : 'navbar-link-item'}
            onClick={() => handleNavigation(path)}
            key={idx}
            data-testid='navbar-link-item'
          >
            <div className='navbar-link-item__icon'>
              <Icon />
            </div>
            {name}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
