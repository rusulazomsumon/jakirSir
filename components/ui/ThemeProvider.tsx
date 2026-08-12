'use client'

import { useEffect } from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const themeKey = 'theme'
    const savedTheme = window.localStorage.getItem(themeKey)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const darkMode = savedTheme ? savedTheme === 'dark' : prefersDark

    const setDarkMode = (enabled: boolean) => {
      document.documentElement.classList.toggle('dark', enabled)
      window.localStorage.setItem(themeKey, enabled ? 'dark' : 'light')
    }

    const toggleTheme = () => {
      const next = !document.documentElement.classList.contains('dark')
      setDarkMode(next)
    }

    setDarkMode(darkMode)
    ;(window as Window & { toggleTheme?: () => void }).toggleTheme = toggleTheme

    const logo = document.querySelector('.logo')
    const logoDoubleClick = () => toggleTheme()
    logo?.addEventListener('dblclick', logoDoubleClick)

    return () => {
      logo?.removeEventListener('dblclick', logoDoubleClick)
      delete (window as Window & { toggleTheme?: () => void }).toggleTheme
    }
  }, [])

  return <>{children}</>
}
