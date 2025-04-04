/**
 * Category Index Layout
 * Shows a grid of all available categories
 */

import { useGlobal } from '@/lib/global'
import { HashTag } from '@/components/HeroIcons'
import Link from 'next/link'

/**
 * Category index layout showing all categories
 * @param {object} props - Component props with categoryOptions
 * @returns {JSX.Element} Category index layout
 */
const LayoutCategoryIndex = (props) => {
  const { categoryOptions } = props
  const { locale } = useGlobal()

  return (
    <div id='category-outer-wrapper' className='mt-8 px-5 md:px-0'>
      <div className='text-4xl font-extrabold dark:text-gray-200 mb-5'>
        {locale.COMMON.CATEGORY}
      </div>
      
      <div
        id='category-list'
        className='duration-200 flex flex-wrap m-10 justify-center'>
        {categoryOptions?.map(category => (
          <Link
            key={category.name}
            href={`/category/${category.name}`}
            className='group mr-5 mb-5 flex flex-nowrap items-center border bg-white text-2xl rounded-xl dark:hover:text-white px-4 cursor-pointer py-3 hover:text-white hover:bg-indigo-600 transition-all hover:scale-110 duration-150'>
            <HashTag className='w-5 h-5 stroke-gray-500 stroke-2' />
            {category.name}
            <div className='bg-[#f1f3f8] ml-1 px-2 rounded-lg group-hover:text-indigo-600'>
              {category.count}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LayoutCategoryIndex
