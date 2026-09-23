import { describe, expect, it } from 'vitest'

import { projectMetadata, projectStructuredData } from './seo'
import { projects } from '../content/projects'

describe('portfolio SEO', () => {
  it('gives every project a canonical URL, distinct social image, and large Twitter card', () => {
    for (const project of projects) {
      const metadata = projectMetadata(project)
      const canonical = metadata.find((item) => 'tagName' in item && item.tagName === 'link')
      const socialImage = metadata.find((item) => 'property' in item && item.property === 'og:image')
      const twitterCard = metadata.find((item) => 'name' in item && item.name === 'twitter:card')

      expect(canonical).toMatchObject({ rel: 'canonical', href: expect.stringContaining(project.caseStudyPath) })
      expect(socialImage).toMatchObject({ content: expect.stringContaining(`/og/${project.slug}.png`) })
      expect(twitterCard).toMatchObject({ content: 'summary_large_image' })
      expect(projectStructuredData(project)).toMatchObject({ '@type': 'SoftwareSourceCode', codeRepository: project.links[0].href })
    }
  })
})
