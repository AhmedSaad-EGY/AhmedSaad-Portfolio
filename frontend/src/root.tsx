import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import logoMark from './assets/brand/logo-mark.png'
import './styles/index.css'

// React Router requires this route-module export to add the favicon to <head>.
// eslint-disable-next-line react-refresh/only-export-components
export const links = () => [
  { rel: 'icon', type: 'image/png', href: logoMark },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-bg font-sans text-text-primary antialiased">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
