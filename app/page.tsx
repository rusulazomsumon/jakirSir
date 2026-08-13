import React from 'react'
import Header from '@/components/layout/Header'
import FloatingButtons from '@/components/layout/FloatingButtons'
import BottomNav from '@/components/layout/BottomNav'
import Hero from '@/components/home/Hero'
import RunningCourses from '@/components/home/RunningCourses'
import QuickTools from '@/components/home/QuickTools'
import LearningHub from '@/components/home/LearningHub'
import PopularCourses from '@/components/home/PopularCourses'
import InstantMCQ from '@/components/home/InstantMCQ'
import { SearchProvider } from '@/components/context/SearchContext'
import RoutineTable from '@/components/home/RoutineTable'
import BlogGrid from '@/components/home/BlogGrid'
import PDFLibrary from '@/components/home/PDFLibrary'
import VideoLibrary from '@/components/home/VideoLibrary'
import CTABanner from '@/components/home/CTABanner'
import Statistics from '@/components/home/Statistics'
import Footer from '@/components/home/Footer'

export default function HomePage() {
  return (
    <SearchProvider>
      <main className="pb-[92px]">
        <Header />
        <div className="px-2">
          <Hero />
          <QuickTools />
          <RunningCourses />
          <LearningHub />
          <PopularCourses />
          <InstantMCQ />
          <RoutineTable />
          <BlogGrid />
          <PDFLibrary />
          <VideoLibrary />
          <CTABanner />
          <Statistics />
          <Footer />
        </div>
        <FloatingButtons />
        <BottomNav />
      </main>
    </SearchProvider>
  )
}
