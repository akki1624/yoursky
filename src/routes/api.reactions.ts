import { createAPIFileRoute } from '@tanstack/react-start/api'

// Reactions API — stores reactions per day using Netlify Blobs
export const APIRoute = createAPIFileRoute('/api/reactions')({
  GET: async ({ request }) => {
    const url = new URL(request.url)
    const day = url.searchParams.get('day')
    if (!day) {
      return new Response(JSON.stringify({ error: 'day required' }), { status: 400 })
    }
    try {
      const { getStore } = await import('@netlify/blobs')
      const store = getStore('birthday-reactions')
      const data = await store.get(`day-${day}`, { type: 'json' }) as Record<string, unknown> | null
      return new Response(JSON.stringify(data || {}), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response(JSON.stringify({}), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },

  POST: async ({ request }) => {
    try {
      const body = await request.json() as { day: string; emoji: string; reply?: string }
      const { day, emoji, reply } = body
      if (!day) return new Response(JSON.stringify({ error: 'day required' }), { status: 400 })

      const { getStore } = await import('@netlify/blobs')
      const store = getStore('birthday-reactions')
      const key = `day-${day}`
      const existing = (await store.get(key, { type: 'json' }) as Record<string, unknown> | null) || {}

      const reactions = (existing.reactions as Record<string, number> | undefined) || {}
      if (emoji) reactions[emoji] = (reactions[emoji] || 0) + 1

      const replies = (existing.replies as string[] | undefined) || []
      if (reply && reply.trim()) replies.push(reply.trim())

      await store.setJSON(key, { reactions, replies })
      return new Response(JSON.stringify({ ok: true, reactions, replies }), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },
})
