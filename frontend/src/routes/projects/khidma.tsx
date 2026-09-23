import { ProjectDetailPage } from '../../components/projects/ProjectDetailPage'
import { getProject } from '../../content/projects'

export default function KhidmaRoute() {
  return <ProjectDetailPage project={getProject('khidma')} />
}
