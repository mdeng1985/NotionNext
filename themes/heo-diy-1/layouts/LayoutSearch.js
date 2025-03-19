/**
 * Search Layout
 * Handles search functionality and results display
 */

import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import replaceSearchResult from '@/components/Mark'
import SearchNav from '../components/SearchNav'
import BlogPostListPage from '../components/BlogPostListPage'
import BlogPostListScroll from '../components/BlogPostListScroll'

/**
 * Search layout
 * @param {object} props - Component props
 * @returns {JSX.Element} Search layout
 */
const LayoutSearch = (props) => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s
  const usePagedList = siteConfig('POST_LIST_STYLE') === 'page'

  // Highlight search results
  useEffect(() => {
    if (currentSearch) {
      setTimeout(() => {
        replaceSearchResult({
          doms: document.getElementsByClassName('replace'),
          search: currentSearch,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }, 100)
    }
  }, [currentSearch])

  return (
    <div currentSearch={currentSearch}>
      <div id='post-outer-wrapper' className='px-5 md:px-0'>
        {!currentSearch ? (
          /* Show search interface if no search term */
          <SearchNav {...props} />
        ) : (
          /* Show search results */
          <div id='posts-wrapper'>
            {usePagedList ? (
              <BlogPostListPage {...props} />
            ) : (
              <BlogPostListScroll {...props} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LayoutSearch
