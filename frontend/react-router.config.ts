import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  prerender: ['/', '/projects', '/projects/clinic-management', '/projects/estatehub', '/projects/saiyad', '/projects/khidma'],
  ssr: false,
} satisfies Config
