// app/not-found.tsx
'use client'

import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // Arahkan user ke halaman statis 404 milik Apache
    window.location.href = '/error-404/404.html'
  }, [])

  return null
}
