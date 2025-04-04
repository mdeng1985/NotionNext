/**
 * Tag Index Layout
 * Shows a grid of all available tags
 */

import { useGlobal } from '@/lib/global'
import { HashTag } from '@/components/HeroIcons'
import Link from 'next/link'

/**
 * Tag index layout showing all tags
 * @param {object} props - Component props with tagOptions
 * @returns {JSX.Element} Tag index layout
 */
const LayoutTagIndex = (props) => {
  const { tagOptions } = props
  const { locale } = useGlobal()

  return (
    <div id='tag-outer-wrapper' className='px-5 mt-8 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
        {locale.COMMON.TAGS}
      </div>
      
      <div
        id='tag-list'
        className='duration-200 flex flex-wrap space-x-5 space-y-5 m-10 justify-center'>
        {tagOptions.map(tag => (
          <Link
            key={tag.name}
            href={`/tag/${tag.name}`}
            className='group flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'>
            <HashTag className='w-5 h-5 stroke-gray-500 stroke-2' />
            {tag.name}
            <div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600'>
              {tag.count}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LayoutTagIndex
