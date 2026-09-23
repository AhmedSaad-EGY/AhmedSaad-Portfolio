import type { Project } from '../content/projects'

import { absoluteUrl, site } from './site'

type PageMetadata = {
  title: string
  description: string
  path: string
  imagePath: string
}

export function pageMetadata({ title, description, path, imagePath }: PageMetadata) {
  const pageUrl = absoluteUrl(path)
  const imageUrl = absoluteUrl(imagePath)

  return [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { tagName: 'link', rel: 'canonical', href: pageUrl },
  ]
}

export function projectMetadata(project: Project) {
  return pageMetadata({
    title: `${project.name} | ${site.name}`,
    description: project.cardSummary,
    path: project.caseStudyPath,
    imagePath: `/og/${project.slug}.png`,
  })
}

export function projectStructuredData(project: Project) {
  const codeRepository = project.links.find((link) => link.label === 'GitHub')?.href

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: project.cardSummary,
    codeRepository,
    url: absoluteUrl(project.caseStudyPath),
  }
}
