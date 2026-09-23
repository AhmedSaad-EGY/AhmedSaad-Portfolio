import { ProjectDetailPage } from '../../components/projects/ProjectDetailPage'
import { getProject } from '../../content/projects'

export default function EstateHubRoute() {
  return <ProjectDetailPage project={getProject('estatehub')} />
}
