type SectionAtmosphereProps = {
  scene: 'about' | 'projects' | 'stack' | 'experience' | 'principles' | 'contact'
}

export function SectionAtmosphere({ scene }: SectionAtmosphereProps) {
  return (
    <div className="section-atmosphere" data-scene={scene} aria-hidden="true">
      <span className="section-atmosphere__field" />
    </div>
  )
}
