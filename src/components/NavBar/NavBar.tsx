import './NavBar.scss'

type NavBarRoute = {
  name: string
  path: string
  icon: string
}
type NavBarRoutes = {
  // eslint-disable-next-line no-unused-vars
  [key in string]: NavBarRoute
}

export type Props = {
  currentPath: string
  routes: NavBarRoutes
  // eslint-disable-next-line no-unused-vars
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
        {routesArray.map((route, idx) => (
          <button
            className={
              currentPath === route.path
                ? 'navbar-link-item navbar-link-item--current'
                : 'navbar-link-item'
            }
            onClick={() => handleNavigation(route.path)}
            key={idx}
            data-testid='navbar-link-item'
          >
            <i className={route.icon}></i>
            {route.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default NavBar
