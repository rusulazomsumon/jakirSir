import React from 'react'

export default function CTABanner(){
  return (
    <section className="pt-6 px-2">
      <div className="rounded-[24px] bg-gradient-to-r from-primary via-primary to-primaryDark p-6 text-white shadow-floating">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold">Join Jakir Sir SMART Edu</h3>
            <p className="mt-2 text-sm">Start your preparation with structured courses and live classes.</p>
          </div>
          <div>
            <button className="inline-flex h-[52px] items-center justify-center rounded-[16px] bg-accent px-5 text-sm font-bold text-textPrimary">Enroll Now</button>
          </div>
        </div>
      </div>
    </section>
  )
}
