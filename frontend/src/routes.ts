import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('projects', './routes/projects.tsx'),
  route('projects/clinic-management', './routes/projects/clinic-management.tsx'),
  route('projects/estatehub', './routes/projects/estatehub.tsx'),
  route('projects/saiyad', './routes/projects/saiyad.tsx'),
  route('projects/khidma', './routes/projects/khidma.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig
