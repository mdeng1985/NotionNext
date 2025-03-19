/**
 * Post Detail Layout
 * Displays single post/page with content and related components
 */

import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

import NotionPage from '@/components/NotionPage'
import Comment from '@/components/Comment'
import ShareBar from '@/components/ShareBar'
import { AdSlot } from '@/components/GoogleAdsense'
import FloatTocButton from '../components/FloatTocButton'
import PostAdjacent from '../components/PostAdjacent'
import PostCopyright from '../components/PostCopyright'
import PostRecommend from '../components/PostRecommend'
import WWAds from '@/components/WWAds'
import AISummary from '@/components/AISummary'
import { PostLock } from '../components/PostLock'

/**
 * Post detail layout (for single articles or pages)
 * @param {object} props - Component props
 * @returns {JSX.Element} Post detail layout
 */
const LayoutSlug = (props) => {
  const { post, lock, validPassword } = props
  const { locale, fullWidth } = useGlobal()
  const [hasCode, setHasCode] = useState(false)
  const router = useRouter()

  // Check if post has code sections to adjust styling
  useEffect(() => {
    const hasCode = document.querySelectorAll('[class^="language-"]').length > 0
    setHasCode(hasCode)
  }, [])

  // Check for 404 after waiting period
  useEffect(() => {
    if (!post) {
      const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) {
            router.push('/404').then(() => {
              console.warn('Page not found', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post, router])

  // Determine if comments should be shown
  const commentEnable =
    siteConfig('COMMENT_TWIKOO_ENV_ID') ||
    siteConfig('COMMENT_WALINE_SERVER_URL') ||
    siteConfig('COMMENT_VALINE_APP_ID') ||
    siteConfig('COMMENT_GISCUS_REPO') ||
    siteConfig('COMMENT_CUSDIS_APP_ID') ||
    siteConfig('COMMENT_UTTERRANCES_REPO') ||
    siteConfig('COMMENT_GITALK_CLIENT_ID') ||
    siteConfig('COMMENT_WEBMENTION_ENABLE')

  return (
    <>
      <div
        className={`article h-full w-full ${fullWidth ? '' : 'xl:max-w-5xl'} ${hasCode ? 'xl:w-[73.15vw]' : ''}  bg-white dark:bg-[#18171d] dark:border-gray-600 lg:hover:shadow lg:border rounded-2xl lg:px-2 lg:py-4 `}>
        
        {/* Password protection layer */}
        {lock && <PostLock validPassword={validPassword} />}

        {/* Post content */}
        {!lock && post && (
          <div className='mx-auto md:w-full md:px-5'>
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Article'>
              
              {/* Main content section */}
              <section
                className='wow fadeInUp p-5 justify-center mx-auto'
                data-wow-delay='.2s'>
                <AISummary aiSummary={post.aiSummary}/>
                <WWAds orientation='horizontal' className='w-full' />
                {post && <NotionPage post={post} />}
                <WWAds orientation='horizontal' className='w-full' />
              </section>

              {/* Post navigation */}
              <PostAdjacent {...props} />

              {/* Share buttons */}
              <ShareBar post={post} />
              
              {/* Additional post info for blog posts */}
              {post?.type === 'Post' && (
                <div className='px-5'>
                  <PostCopyright {...props} />
                  <PostRecommend {...props} />
                </div>
              )}
            </article>

            {/* Comments section */}
            {!fullWidth && commentEnable && post && (
              <div className=''>
                <hr className='my-4 border-dashed' />
                <div className='py-2'>
                  <AdSlot />
                </div>
                <div className='duration-200 overflow-x-auto px-5'>
                  <div className='text-2xl dark:text-white'>
                    <i className='fas fa-comment mr-1' />
                    {locale.COMMON.COMMENTS}
                  </div>
                  <Comment frontMatter={post} className='' />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating TOC button for mobile */}
      <FloatTocButton {...props} />
    </>
  )
}

export default LayoutSlug
