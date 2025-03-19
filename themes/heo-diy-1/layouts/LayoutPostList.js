/**
 * Blog Post List Layout
 * Used for displaying lists of posts on category and tag pages
 */

import { siteConfig } from '@/lib/config'
import CategoryBar from '../components/CategoryBar'
import BlogPostListPage from '../components/BlogPostListPage'
import BlogPostListScroll from '../components/BlogPostListScroll'

/**
 * Blog post list layout (used for category/tag pages)
 * @param {object} props - Component props
 * @returns {JSX.Element} Post list layout
 */
const LayoutPostList = (props) => {
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

export default LayoutPostList
