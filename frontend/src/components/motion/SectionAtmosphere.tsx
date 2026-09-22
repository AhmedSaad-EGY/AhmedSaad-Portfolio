type SectionAtmosphereProps = {
  scene: 'about' | 'projects' | 'stack' | 'experience' | 'principles' | 'contact'
}

export function SectionAtmosphere({ scene }: SectionAtmosphereProps) {
  return (
    <div className="section-atmosphere" data-scene={scene} aria-hidden="true">
      <span className="section-atmosphere__mesh" />
      <span className="section-atmosphere__beam section-atmosphere__beam--one" />
      <span className="section-atmosphere__beam section-atmosphere__beam--two" />
      <span className="section-atmosphere__node section-atmosphere__node--one" />
      <span className="section-atmosphere__node section-atmosphere__node--two" />
      <span className="section-atmosphere__sweep" />
    </div>
  )
}
