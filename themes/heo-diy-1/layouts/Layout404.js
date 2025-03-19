/**
 * 404 Not Found Layout
 * Provides a user-friendly error page with suggestions
 */

import { useGlobal } from '@/lib/global'
import { Transition } from '@headlessui/react'
import LazyImage from '@/components/LazyImage'
import Link from 'next/link'
import LatestPostsGroup from '../components/LatestPostsGroup'

/**
 * 404 Not Found layout
 * @param {object} props - Component props
 * @returns {JSX.Element} 404 layout
 */
const Layout404 = (props) => {
  const { onLoading, fullWidth } = useGlobal()

  return (
    <main
      id='wrapper-outer'
      className={`flex-grow ${fullWidth ? '' : 'max-w-4xl'} w-screen mx-auto px-5`}>
      <div id='error-wrapper' className='w-full mx-auto justify-center'>
        <Transition
          show={!onLoading}
          appear={true}
          enter='transition ease-in-out duration-700 transform order-first'
          enterFrom='opacity-0 translate-y-16'
          enterTo='opacity-100'
          leave='transition ease-in-out duration-300 transform'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-16'
          unmount={false}>
          
          {/* 404 card */}
          <div className='error-content flex flex-col md:flex-row w-full mt-12 h-[30rem] md:h-96 justify-center items-center bg-white dark:bg-[#1B1C20] border dark:border-gray-800 rounded-3xl'>
            {/* Left side animation */}
            <LazyImage
              className='error-img h-60 md:h-full p-4'
              src='https://bu.dusays.com/2023/03/03/6401a7906aa4a.gif'
              alt='404 Not Found'
            />

            {/* Right side text */}
            <div className='error-info flex-1 flex flex-col justify-center items-center space-y-4'>
              <h1 className='error-title font-extrabold md:text-9xl text-7xl dark:text-white'>
                404
              </h1>
              <div className='dark:text-white'>
                Please try searching for content
              </div>
              <Link href='/'>
                <button className='bg-blue-500 py-2 px-4 text-white shadow rounded-lg hover:bg-blue-600 hover:shadow-md duration-200 transition-all'>
                  Return to Home
                </button>
              </Link>
            </div>
          </div>

          {/* Latest posts section */}
          <div className='mt-12'>
            <LatestPostsGroup {...props} />
          </div>
        </Transition>
      </div>
    </main>
  )
}

export default Layout404
