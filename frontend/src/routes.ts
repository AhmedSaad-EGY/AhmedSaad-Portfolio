import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('projects', './routes/projects.tsx'),
  route('projects/clinic-management', './routes/projects/clinic-management.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig
