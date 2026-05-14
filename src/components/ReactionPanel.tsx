import { useState, useEffect } from 'react'

interface Props {
  day: string
}

const EMOJIS = ['💖', '😭', '🥺', '✨', '💕', '🥹', '💫', '🌸']

interface ReactionData {
  reactions: Record<string, number>
  replies: string[]
}

export default function ReactionPanel({ day }: Props) {
  const [data, setData] = useState<ReactionData>({ reactions: {}, replies: [] })
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [activeEmoji, setActiveEmoji] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/reactions?day=${encodeURIComponent(day)}`)
      .then(r => r.json())
      .then(d => setData(d || { reactions: {}, replies: [] }))
      .catch(() => {})
  }, [day])

  const react = async (emoji: string) => {
    setActiveEmoji(emoji)
    setData(prev => ({
      ...prev,
      reactions: { ...prev.reactions, [emoji]: (prev.reactions[emoji] || 0) + 1 },
    }))
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, emoji }),
      })
    } catch {}
  }

  const sendReply = async () => {
    if (!reply.trim()) return
    setSending(true)
    const text = reply.trim()
    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, reply: text }),
      })
      setData(prev => ({ ...prev, replies: [...prev.replies, text] }))
      setReply('')
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    } catch {}
    setSending(false)
  }

  return (
    <div
      className="rounded-3xl p-6"
      style={{
        background: 'rgba(13,5,32,0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(244,114,182,0.2)',
      }}
    >
      <h3 className="font-script text-xl mb-4" style={{ color: '#f472b6' }}>
        How did this make you feel? ♡
      </h3>

      {/* Emoji reactions */}
      <div className="flex flex-wrap gap-2 mb-5">
        {EMOJIS.map(emoji => (
          <button
            key={emoji}
            className="reaction-btn"
            style={{
              background: activeEmoji === emoji ? 'rgba(244,114,182,0.2)' : 'rgba(168,85,247,0.1)',
              border: activeEmoji === emoji ? '1px solid rgba(244,114,182,0.4)' : '1px solid rgba(168,85,247,0.2)',
            }}
            onClick={() => react(emoji)}
          >
            <span>{emoji}</span>
            {data.reactions[emoji] ? (
              <span className="text-xs font-body" style={{ color: 'rgba(196,181,253,0.6)' }}>
                {data.reactions[emoji]}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {/* Reply box */}
      <div className="space-y-3">
        <p className="font-body text-sm" style={{ color: 'rgba(196,181,253,0.6)' }}>
          Leave a little note...
        </p>
        <textarea
          value={reply}
          onChange={e => setReply(e.target.value)}
          placeholder="Write something sweet... ♡"
          rows={3}
          className="w-full rounded-xl px-4 py-3 resize-none font-body text-sm outline-none transition-all duration-300"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            color: '#e9d5ff',
            lineHeight: '1.6',
          }}
          onFocus={e => {
            e.target.style.border = '1px solid rgba(244,114,182,0.4)'
            e.target.style.boxShadow = '0 0 15px rgba(244,114,182,0.1)'
          }}
          onBlur={e => {
            e.target.style.border = '1px solid rgba(168,85,247,0.2)'
            e.target.style.boxShadow = 'none'
          }}
        />
        <button
          onClick={sendReply}
          disabled={sending || !reply.trim()}
          className="btn-magical text-sm py-2.5 px-6"
          style={{ opacity: !reply.trim() ? 0.5 : 1 }}
        >
          {sent ? '✓ Sent ♡' : sending ? 'Sending...' : 'Send ♡'}
        </button>
      </div>

      {/* Existing replies */}
      {data.replies.length > 0 && (
        <div className="mt-5 space-y-2">
          <p className="font-body text-xs uppercase tracking-widest" style={{ color: 'rgba(196,181,253,0.4)' }}>
            Your notes
          </p>
          {data.replies.map((r, i) => (
            <div
              key={i}
              className="px-4 py-3 rounded-xl font-body text-sm"
              style={{
                background: 'rgba(244,114,182,0.06)',
                border: '1px solid rgba(244,114,182,0.15)',
                color: 'rgba(233,213,255,0.7)',
                lineHeight: '1.6',
              }}
            >
              "{r}"
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
