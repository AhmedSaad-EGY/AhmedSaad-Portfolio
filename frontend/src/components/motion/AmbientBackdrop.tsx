import { useLocation } from 'react-router'

function getScene(pathname: string) {
  if (pathname === '/projects/clinic-management') {
    return 'clinic'
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
      <span className="ambient-backdrop__grid" />
      <span className="ambient-backdrop__glow ambient-backdrop__glow--primary" />
      <span className="ambient-backdrop__glow ambient-backdrop__glow--secondary" />
      <span className="ambient-backdrop__pointer" />
      <span className="ambient-backdrop__orbit ambient-backdrop__orbit--one" />
      <span className="ambient-backdrop__orbit ambient-backdrop__orbit--two" />
      <span className="ambient-backdrop__scan" />
      <span className="ambient-backdrop__line ambient-backdrop__line--one" />
      <span className="ambient-backdrop__line ambient-backdrop__line--two" />
    </div>
  )
}
