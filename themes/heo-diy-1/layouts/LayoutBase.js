/**
 * Base Layout Component
 * Provides the main structure for all pages with header, footer, and content areas
 */

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Style } from '../style'
import Hero from '../components/Hero'
import { NoticeBar } from '../components/NoticeBar'
import PostHeader from '../components/PostHeader'
import SideRight from '../components/SideRight'
import CONFIG from '../config'
import LoadingCover from '@/components/LoadingCover'

/**
 * Base layout - provides the main structure for all pages
 */
const LayoutBase = props => {
  const { children, slotTop, className } = props

  // Global settings
  const { fullWidth, isDarkMode } = useGlobal()
  const router = useRouter()

  // Check if we're on the home page
  const isHomePage = router.route === '/'
  
  // Loading animation settings
  const HEO_LOADING_COVER = siteConfig('HEO_LOADING_COVER', true, CONFIG)
  
  // Layout settings
  const HEO_HERO_BODY_REVERSE = siteConfig('HEO_HERO_BODY_REVERSE', false, CONFIG)
  
  // Set max width based on full-width mode
  const maxWidth = fullWidth ? 'max-w-[96rem] mx-auto' : 'max-w-[86rem]'

  // Header slot content
  const headerSlot = (
    <header>
      {/* Top navigation */}
      <Header {...props} />

      {/* Notice banner and hero section on homepage */}
      {isHomePage && (
        <>
          <NoticeBar />
          {/* <Hero {...props} /> */}
        </>
      )}
      
      {/* Post header for non-full-width pages */}
      {!fullWidth && <PostHeader {...props} isDarkMode={isDarkMode} />}
    </header>
  )

  // Right sidebar slot
  const slotRight = (router.route === '/404' || fullWidth) 
    ? null 
    : <SideRight {...props} />

  // Load WOW.js for animations
  // 添加在return语句前，useEffect内部
  useEffect(() => {
  // 加载WOW.js动画
  loadWowJS()
  
  // 添加Font Awesome图标库，如果尚未添加
  if (typeof window !== 'undefined' && !document.getElementById('font-awesome-css')) {
    const link = document.createElement('link')
    link.id = 'font-awesome-css'
    link.rel = 'stylesheet'
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    document.head.appendChild(link)
  }
}, [])

  return (
    <div
      id='theme-heo'
      className={`${siteConfig('FONT_STYLE')} bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}>
      
      {/* Global styles */}
      <Style />

      {/* Header */}
      {headerSlot}

      {/* Main content area */}
      <main
        id='wrapper-outer'
        className={`flex-grow w-full ${maxWidth} mx-auto relative md:px-5`}>
        <div
          id='container-inner'
          className={`${HEO_HERO_BODY_REVERSE ? 'flex-row-reverse' : ''} w-full mx-auto lg:flex justify-center relative z-10`}>
          
          {/* Main content */}
          <div className={`w-full h-auto ${className || ''}`}>
            {slotTop}
            {children}
          </div>

          {/* Spacing */}
          <div className='lg:px-2'></div>

          {/* Right sidebar */}
          <div className='hidden xl:block'>
            {slotRight}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Loading cover animation */}
      {HEO_LOADING_COVER && <LoadingCover />}
    </div>
  )
}

export default LayoutBase
