"use client"

import React from 'react'

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-3">
      <a
        href="https://wa.me/8801521496532"
        target="_blank"
        rel="noreferrer"
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#1DA851]"
        aria-label="Contact on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414zM12 2.25c-5.384 0-9.75 4.365-9.75 9.75 0 1.741.466 3.447 1.353 4.958L2.25 22.5l5.147-1.353A9.706 9.706 0 0012 21.75c5.384 0 9.75-4.365 9.75-9.75S17.384 2.25 12 2.25z" />
        </svg>
      </a>
    </div>
  )
}
