import type { Config } from '@react-router/dev/config'

export default {
  appDirectory: 'src',
  prerender: ['/', '/projects', '/projects/clinic-management'],
  ssr: false,
} satisfies Config
