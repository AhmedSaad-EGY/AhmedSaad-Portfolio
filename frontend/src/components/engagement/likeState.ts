export type LikeSnapshot = {
  count: number
  liked: boolean
}

export type LikeStatus = 'loading' | 'ready' | 'saving' | 'error'

export function isLikeSnapshot(value: unknown): value is LikeSnapshot {
  if (!value || typeof value !== 'object') {
    return false
  }

  const snapshot = value as Partial<LikeSnapshot>
  return Number.isSafeInteger(snapshot.count) && Number(snapshot.count) >= 0 && typeof snapshot.liked === 'boolean'
}

export function likeButtonLabel(snapshot: LikeSnapshot | null) {
  return `${snapshot?.liked ? 'Remove your like from' : 'Like'} this portfolio. ${snapshot?.count ?? 'Count unavailable'} likes.`
}

export function likeCountLabel(snapshot: LikeSnapshot | null) {
  return snapshot ? new Intl.NumberFormat('en').format(snapshot.count) : '—'
}

const textEntryInputTypes = new Set([
  'text',
  'search',
  'email',
  'url',
  'tel',
  'password',
  'number',
  'date',
  'datetime-local',
  'month',
  'time',
  'week',
])

/** Detects a focused control that opens the on-screen keyboard on mobile. */
export function isTextEntryControl(element: Element | null | undefined) {
  if (!element || typeof window === 'undefined') {
    return false
  }

  if (element instanceof HTMLTextAreaElement) {
    return true
  }

  if (element instanceof HTMLInputElement) {
    return textEntryInputTypes.has(element.type)
  }

  return false
}
