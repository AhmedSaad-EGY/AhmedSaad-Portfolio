import { ProjectDetailPage } from '../../components/projects/ProjectDetailPage'
import { getProject } from '../../content/projects'
import { projectMetadata } from '../../app/seo'

const project = getProject('saiyad')

export function meta() {
  return projectMetadata(project)
}

export default function SaiyadRoute() {
  return <ProjectDetailPage project={project} />
}
