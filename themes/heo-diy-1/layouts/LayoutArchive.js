/**
 * Archive Layout
 * Shows posts grouped by date in archive format
 */

import CategoryBar from '../components/CategoryBar'
import BlogPostArchive from '../components/BlogPostArchive'

/**
 * Archive layout for displaying posts grouped by date
 * @param {object} props - Component props with archivePosts
 * @returns {JSX.Element} Archive layout
 */
const LayoutArchive = (props) => {
  const { archivePosts } = props

  return (
    <div className='p-5 rounded-xl border dark:border-gray-600 max-w-6xl w-full bg-white dark:bg-[#1e1e1e]'>
      {/* Category filter bar */}
      <CategoryBar {...props} border={false} />

      {/* Archive groups by date */}
      <div className='px-3'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogPostArchive
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
            siteInfo={props.siteInfo}
          />
        ))}
      </div>
    </div>
  )
}

export default LayoutArchive
