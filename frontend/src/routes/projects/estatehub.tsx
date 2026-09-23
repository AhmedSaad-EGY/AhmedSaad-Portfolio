import { ProjectDetailPage } from '../../components/projects/ProjectDetailPage'
import { getProject } from '../../content/projects'
import { projectMetadata } from '../../app/seo'

const project = getProject('estatehub')

export function meta() {
  return projectMetadata(project)
}

export default function EstateHubRoute() {
  return <ProjectDetailPage project={project} />
}
