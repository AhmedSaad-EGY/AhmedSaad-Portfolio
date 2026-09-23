import { ProjectDetailPage } from '../../components/projects/ProjectDetailPage'
import { getProject } from '../../content/projects'

export default function SaiyadRoute() {
  return <ProjectDetailPage project={getProject('saiyad')} />
}
