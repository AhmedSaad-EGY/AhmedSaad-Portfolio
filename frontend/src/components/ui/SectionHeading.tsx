type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`max-w-[43rem] ${alignment}`}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="mt-5 text-3xl font-semibold leading-[1.12] tracking-[-0.035em] text-text-primary sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">{description}</p> : null}
    </div>
  )
}
