import { createAPIFileRoute } from '@tanstack/react-start/api'

export const APIRoute = createAPIFileRoute('/api/wish-jar')({
  GET: async () => {
    try {
      const { getStore } = await import('@netlify/blobs')
      const store = getStore('birthday-wishes')
      const data = await store.get('wishes', { type: 'json' })
      return new Response(JSON.stringify(data || null), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response(JSON.stringify(null), {
        headers: { 'Content-Type': 'application/json' },
      })
    }
  },

  POST: async ({ request }) => {
    try {
      const body = await request.json() as { answer: string; wishes: string[]; ts: number }
      const { getStore } = await import('@netlify/blobs')
      const store = getStore('birthday-wishes')
      await store.setJSON('wishes', body)
      return new Response(JSON.stringify({ ok: true }), {
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
