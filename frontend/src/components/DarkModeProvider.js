'use client'

export default function DarkModeProvider({ children }) {
  // Theme context now handles all theme logic
  // This component is kept for backward compatibility
  return <>{children}</>
}
