type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''

  return (
    <div className={`section-heading max-w-[52rem] ${alignment}`}>
      <p className="section-heading__eyebrow section-eyebrow">{eyebrow}</p>
      <h2 className="section-heading__title mt-5 text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.035em] text-text-primary sm:text-[2rem] lg:text-[2.15rem] 2xl:whitespace-nowrap">{title}</h2>
      {description ? <p className="section-heading__description mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">{description}</p> : null}
      <span className="section-heading__rule" aria-hidden="true" />
    </div>
  )
}
