import { ProjectDetailPage } from '../../components/projects/ProjectDetailPage'
import { getProject } from '../../content/projects'
import { projectMetadata } from '../../app/seo'

const project = getProject('khidma')

export function meta() {
  return projectMetadata(project)
}

export default function KhidmaRoute() {
  return <ProjectDetailPage project={project} />
}
