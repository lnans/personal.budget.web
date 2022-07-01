import './AuthLoader.scss'

function AuthLoader() {
  return (
    <div className='auth-loader' data-testid='auth-loader'>
      <img alt='app logo' src='/logo.png' className='auth-loader__logo'></img>
      <div className='auth-loader__spinner'></div>
    </div>
  )
}

export default AuthLoader
