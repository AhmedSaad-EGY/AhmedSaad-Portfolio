import { site } from '../../app/site'
import { likeButtonLabel, likeCountLabel, type LikeSnapshot, type LikeStatus } from './likeState'

type MobileDockProps = {
  snapshot: LikeSnapshot | null
  status: LikeStatus
  celebrating: boolean
  isPromptVisible: boolean
  isTextEntryFocused: boolean
  onToggleLike: () => void
}

export function MobileDock({ snapshot, status, celebrating, isPromptVisible, isTextEntryFocused, onToggleLike }: MobileDockProps) {
  return (
    <nav
      className="mobile-dock"
      aria-label="Portfolio quick actions"
      data-input-focused={isTextEntryFocused ? 'true' : 'false'}
    >
      {isPromptVisible ? (
        <p className="engagement-like__prompt mobile-dock__prompt" aria-hidden="true">Enjoying the portfolio? Leave a like.</p>
      ) : null}
      <ul className="mobile-dock__items">
        <li className="mobile-dock__cell">
          <a className="focus-ring mobile-dock__item" href={site.links.github} target="_blank" rel="noreferrer" aria-label="Ahmed Saad GitHub profile">
            <svg className="mobile-dock__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
              <path d="M12 .3C5.4.3 0 5.7 0 12c0 5.2 3.4 9.6 8.2 11.2.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.3-1.4-1.7-1.4-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 21.6 24 17.2 24 12c0-6.3-5.4-11.7-12-11.7Z" />
            </svg>
            <span className="mobile-dock__label">GitHub</span>
          </a>
        </li>
        <li className="mobile-dock__cell">
          <a className="focus-ring mobile-dock__item" href={site.links.linkedin} target="_blank" rel="noreferrer" aria-label="Ahmed Saad LinkedIn profile">
            <svg className="mobile-dock__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
              <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.5 20h-3.37v-5.9c0-1.48-.53-2.5-1.86-2.5-1.01 0-1.61.68-1.88 1.34-.1.23-.12.55-.12.88V20H9.9V8.5h3.37v1.62c.2-.55 1.06-1.34 2.56-1.34 1.88 0 3.27 1.22 3.27 3.85V20Z" />
            </svg>
            <span className="mobile-dock__label">LinkedIn</span>
          </a>
        </li>
        <li className="mobile-dock__cell">
          <button
            className="focus-ring engagement-like__button mobile-dock__like"
            type="button"
            aria-label={likeButtonLabel(snapshot)}
            aria-pressed={snapshot?.liked ?? false}
            disabled={!snapshot || status === 'saving'}
            data-liked={snapshot?.liked ? 'true' : 'false'}
            data-celebrate={celebrating ? 'true' : 'false'}
            onClick={onToggleLike}
          >
            <span className="engagement-like__flash" aria-hidden="true" />
            <span className="mobile-dock__like-header" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="transparent" stroke="currentColor" strokeWidth="1.7">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
              </svg>
              <span className="engagement-like__count">{likeCountLabel(snapshot)}</span>
            </span>
            <span className="mobile-dock__label" aria-hidden="true">
              {status === 'error' ? 'OFFLINE' : snapshot?.liked ? 'Liked' : 'Like'}
            </span>
          </button>
        </li>
        <li className="mobile-dock__cell">
          <a className="focus-ring mobile-dock__item" href={site.links.whatsapp} target="_blank" rel="noreferrer" aria-label="Ahmed Saad WhatsApp">
            <svg className="mobile-dock__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L4 20.4l1.2-3.8A8.5 8.5 0 1 1 20.5 11.7Z" />
              <path d="M9.1 8.3c.4-.1.9 0 1.2.4l.7 1.1c.2.3.1.7-.2 1l-.4.4c-.2.2-.3.5-.1.8.5.9 1.2 1.6 2.1 2.1.3.1.6 0 .8-.2l.4-.4c.3-.3.7-.3 1-.2l1.1.7c.4.2.5.7.4 1.1-.2.9-1.1 1.5-2 1.5-2.8-.1-5.5-2.8-5.6-5.6 0-.9.6-1.7 1.5-1.9Z" />
            </svg>
            <span className="mobile-dock__label">WhatsApp</span>
          </a>
        </li>
        <li className="mobile-dock__cell">
          <a className="focus-ring mobile-dock__item" href={site.links.resume} target="_blank" rel="noreferrer" aria-label="Ahmed Saad Curriculum Vitae">
            <svg className="mobile-dock__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
              <path d="M14 3v5h5" />
              <path d="M9 13h6" />
              <path d="M9 17h4" />
            </svg>
            <span className="mobile-dock__label">CV</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
