import Link from 'next/link'
import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-8 bg-white border-t border-border p-6 text-sm text-textSecondary">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h4 className="font-bold text-textPrimary">About</h4>
            <p className="mt-2">Jakir Sir SMART Edu Portal — mobile-first learning.</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <h4 className="font-bold text-textPrimary">Quick Links</h4>
            <div className="mt-2 flex gap-3">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/courses" className="hover:underline">Courses</Link>
            </div>
          </div>
        </div>
        <div className="mt-6 text-xs text-textSecondary">© {new Date().getFullYear()} Jakir Sir</div>
      </div>
    </footer>
  )
}
