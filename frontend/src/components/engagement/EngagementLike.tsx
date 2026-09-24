import { useEffect, useRef, useState } from 'react'

import { apiUrl } from '../../app/api'

const visitorKey = 'portfolio-visitor-id'
const likePromptSessionKey = 'portfolio-like-prompt-shown'
const likePromptDelayMs = 10_000
const likePromptDurationMs = 5_000

type LikeSnapshot = {
  count: number
  liked: boolean
}

function getVisitorId() {
  const existing = window.localStorage.getItem(visitorKey)
  if (existing) {
    return existing
  }

  const visitorId = window.crypto.randomUUID()
  window.localStorage.setItem(visitorKey, visitorId)
  return visitorId
}

function isLikeSnapshot(value: unknown): value is LikeSnapshot {
  if (!value || typeof value !== 'object') {
    return false
  }

  const snapshot = value as Partial<LikeSnapshot>
  return Number.isSafeInteger(snapshot.count) && Number(snapshot.count) >= 0 && typeof snapshot.liked === 'boolean'
}

export function EngagementLike() {
  const [snapshot, setSnapshot] = useState<LikeSnapshot | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'saving' | 'error'>('loading')
  const [celebrating, setCelebrating] = useState(false)
  const [isPromptVisible, setIsPromptVisible] = useState(false)
  const [notice, setNotice] = useState('Loading portfolio appreciation count.')
  const visitorIdRef = useRef('')
  const celebrationTimerRef = useRef<number | null>(null)
  const promptTimerRef = useRef<number | null>(null)
  const promptDismissTimerRef = useRef<number | null>(null)

  useEffect(() => {
    let active = true
    const visitorId = getVisitorId()
    visitorIdRef.current = visitorId

    void fetch(apiUrl(`/api/engagement/likes?visitorId=${encodeURIComponent(visitorId)}`), {
      headers: { Accept: 'application/json' },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Like request failed with status ${response.status}`)
        }

        const result: unknown = await response.json()
        if (!isLikeSnapshot(result)) {
          throw new Error('Invalid like response')
        }

        if (active) {
          setSnapshot(result)
          setStatus('ready')
          setNotice('Portfolio appreciation count loaded.')
        }
      })
      .catch(() => {
        if (active) {
          setStatus('error')
          setNotice('Portfolio appreciation is unavailable until the backend service is connected.')
        }
      })

    return () => {
      active = false
      if (celebrationTimerRef.current !== null) {
        window.clearTimeout(celebrationTimerRef.current)
      }
      if (promptTimerRef.current !== null) {
        window.clearTimeout(promptTimerRef.current)
      }
      if (promptDismissTimerRef.current !== null) {
        window.clearTimeout(promptDismissTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (status !== 'ready' || !snapshot || snapshot.liked || window.sessionStorage.getItem(likePromptSessionKey)) {
      return
    }

    let remainingDelay = likePromptDelayMs
    let startedAt = 0

    function clearPromptTimer() {
      if (promptTimerRef.current !== null) {
        window.clearTimeout(promptTimerRef.current)
        promptTimerRef.current = null
      }
    }

    function showPrompt() {
      window.sessionStorage.setItem(likePromptSessionKey, 'true')
      setIsPromptVisible(true)
      promptDismissTimerRef.current = window.setTimeout(() => setIsPromptVisible(false), likePromptDurationMs)
    }

    function schedulePrompt() {
      if (document.visibilityState !== 'visible' || promptTimerRef.current !== null) {
        return
      }

      startedAt = Date.now()
      promptTimerRef.current = window.setTimeout(showPrompt, remainingDelay)
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        schedulePrompt()
        return
      }

      if (startedAt > 0) {
        remainingDelay = Math.max(0, remainingDelay - (Date.now() - startedAt))
      }
      clearPromptTimer()
    }

    schedulePrompt()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearPromptTimer()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [snapshot, status])

  async function toggleLike() {
    if (!snapshot || status === 'saving') {
      return
    }

    const nextLiked = !snapshot.liked
    window.sessionStorage.setItem(likePromptSessionKey, 'true')
    setIsPromptVisible(false)
    if (promptTimerRef.current !== null) {
      window.clearTimeout(promptTimerRef.current)
      promptTimerRef.current = null
    }
    if (promptDismissTimerRef.current !== null) {
      window.clearTimeout(promptDismissTimerRef.current)
      promptDismissTimerRef.current = null
    }
    if (celebrationTimerRef.current !== null) {
      window.clearTimeout(celebrationTimerRef.current)
      celebrationTimerRef.current = null
    }
    setCelebrating(false)
    setStatus('saving')
    setNotice(nextLiked ? 'Adding your appreciation.' : 'Removing your appreciation.')

    try {
      const response = await fetch(apiUrl('/api/engagement/likes'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ visitorId: visitorIdRef.current, liked: nextLiked }),
      })

      if (!response.ok) {
        throw new Error(`Like update failed with status ${response.status}`)
      }

      const result: unknown = await response.json()
      if (!isLikeSnapshot(result)) {
        throw new Error('Invalid like response')
      }

      setSnapshot(result)
      setStatus('ready')
      setNotice(nextLiked ? 'Thank you for appreciating this portfolio.' : 'Your appreciation was removed.')

      if (nextLiked) {
        setCelebrating(true)
        celebrationTimerRef.current = window.setTimeout(() => setCelebrating(false), 520)
      }
    } catch {
      setStatus('error')
      setNotice('The appreciation could not be updated. Please try again.')
    }
  }

  const countLabel = snapshot ? new Intl.NumberFormat('en').format(snapshot.count) : '—'
  const isUnavailable = status === 'error'

  return (
    <aside className="engagement-like" aria-label="Portfolio appreciation">
      {isPromptVisible && (
        <p className="engagement-like__prompt" aria-hidden="true">
          Enjoying the portfolio? Leave a like.
        </p>
      )}
      <button
        className="focus-ring engagement-like__button"
        type="button"
        aria-label={`${snapshot?.liked ? 'Remove your like from' : 'Like'} this portfolio. ${snapshot?.count ?? 'Count unavailable'} likes.`}
        aria-pressed={snapshot?.liked ?? false}
        disabled={!snapshot || status === 'saving'}
        data-liked={snapshot?.liked ? 'true' : 'false'}
        data-celebrate={celebrating ? 'true' : 'false'}
        onClick={toggleLike}
      >
        <span className="engagement-like__flash" aria-hidden="true" />
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
        </svg>
        <span className="engagement-like__text" aria-hidden="true">{snapshot?.liked ? 'Liked' : 'Like'}</span>
        <span className="engagement-like__count" aria-hidden="true">{countLabel}</span>
      </button>
      <span className="engagement-like__label" aria-hidden="true">{isUnavailable ? 'OFFLINE' : 'APPRECIATE'}</span>
      <span className="sr-only" aria-live="polite">{notice}</span>
    </aside>
  )
}
