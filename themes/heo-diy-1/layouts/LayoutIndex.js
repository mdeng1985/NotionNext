/**
 * Homepage Layout
 * Displays blog posts with category navigation
 */

import { siteConfig } from '@/lib/config'
import CategoryBar from '../components/CategoryBar'
import BlogPostListPage from '../components/BlogPostListPage'
import BlogPostListScroll from '../components/BlogPostListScroll'

/**
 * Homepage Layout
 * @param {object} props - Component props
 * @returns {JSX.Element} Homepage layout
 */
const LayoutIndex = (props) => {
  // Determine which post list style to use based on config
  const usePagedList = siteConfig('POST_LIST_STYLE') === 'page'

  return (
    <div id='post-outer-wrapper' className='px-5 md:px-0'>
      {/* Category filter bar */}
      <CategoryBar {...props} />
      
      {/* Post listing - either paged or infinite scroll */}
      {usePagedList ? (
        <BlogPostListPage {...props} />
      ) : (
        <BlogPostListScroll {...props} />
      )}
    </div>
  )
}

export default LayoutIndex
