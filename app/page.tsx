'use client'

import React, { useEffect, useState } from 'react'

const TARGET_DATE = new Date('2026-08-13T22:00:00+06:00').getTime()

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, target - now)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, diff: diff > 0 }
}

const TIME_UNITS = [
  { label: 'Days', key: 'days' },
  { label: 'Hours', key: 'hours' },
  { label: 'Minutes', key: 'minutes' },
  { label: 'Seconds', key: 'seconds' },
] as const

function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-3">
      {TIME_UNITS.map(({ label, key }) => {
        const value = mounted
          ? String(
              key === 'days'
                ? days
                : key === 'hours'
                  ? hours
                  : key === 'minutes'
                    ? minutes
                    : seconds
            ).padStart(2, '0')
          : '--'

        return (
          <div
            key={key}
            className="flex flex-col items-center justify-center rounded-2xl border border-primary/10 bg-primary/5 p-3 sm:p-4 shadow-sm"
          >
            <span className="font-sans text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
              {value}
            </span>
            <span className="mt-1 font-sans text-xs font-medium text-textSecondary sm:text-sm">
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function ComingSoonPage() {
  return (
    <div className="-mx-4 sm:-mx-5 md:-mx-6 lg:-mx-8 flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="w-full max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/60 bg-white/80 p-6 shadow-card backdrop-blur-sm sm:p-10 lg:p-12">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10 sm:h-28 sm:w-28">
            <img
              src="/images/jakiredulogo.png"
              alt="Jakir Sir SMART Edu Portal"
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            />
          </div>

          <h1 className="mt-8 text-center font-sans text-2xl font-bold text-textPrimary sm:text-3xl lg:text-4xl">
            jakiredu.com - Jakir Sir SMART Edu Portal
          </h1>

          <p className="mt-3 text-center font-sans text-base text-textSecondary sm:text-lg">
            ব্যাংক ও সরকারি চাকরি প্রস্তুতির জন্য বাংলাদেশের স্মার্ট এডুটেক প্ল্যাটফর্ম
          </p>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="font-sans text-sm font-semibold text-primary">
                Platform Launching Soon
              </span>
            </div>
          </div>

          <CountdownTimer />

          <div className="my-8 h-px w-full bg-border" />

          <div className="flex flex-row justify-center items-center gap-4">
            <a
              href="https://wa.me/8801914690469"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:brightness-110 hover:scale-110"
            >
              <WhatsAppIcon />
            </a>
            <a
              href="https://web.facebook.com/JakirSirOfficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1877F2] text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:brightness-110 hover:scale-110"
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.youtube.com/@JakirSirOfficial-u9z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FF0000] text-white shadow-sm transition-all duration-200 hover:shadow-lg hover:brightness-110 hover:scale-110"
            >
              <YouTubeIcon />
            </a>
          </div>

          <p className="mt-10 text-center font-sans text-xs text-textSecondary">
            &copy; {new Date().getFullYear()} Jakir Sir SMART Edu Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}
