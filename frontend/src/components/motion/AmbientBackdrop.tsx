import { useLocation } from 'react-router'

function getScene(pathname: string) {
  if (pathname.startsWith('/projects/')) {
    return 'detail'
  }

  if (pathname === '/projects') {
    return 'projects'
  }

  return 'home'
}

export function AmbientBackdrop() {
  const location = useLocation()

  return (
    <div className={`ambient-backdrop ambient-backdrop--${getScene(location.pathname)}`} aria-hidden="true">
      <span className="ambient-backdrop__glow" />
    </div>
  )
}
