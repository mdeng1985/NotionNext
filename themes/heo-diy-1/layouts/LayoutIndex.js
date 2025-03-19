/**
 * 自定义首页布局
 * 根据 Notion 首页源码创建的自定义首页
 */

import Link from 'next/link'
import { siteConfig } from '@/lib/config'
import LazyImage from '@/components/LazyImage'
import { useGlobal } from '@/lib/global'
import { useState, useEffect } from 'react'

/**
 * 首页布局
 * @param {object} props - 组件属性
 * @returns {JSX.Element} 首页布局
 */
const LayoutIndex = (props) => {
  const { siteInfo, posts } = props
  const { locale } = useGlobal()
  const [featuredPosts, setFeaturedPosts] = useState([])

  // 从所有文章中筛选出最新的几篇作为特色内容
  useEffect(() => {
    if (posts && posts.length > 0) {
      // 获取最新的3篇文章作为特色内容
      const featured = posts.slice(0, 3)
      setFeaturedPosts(featured)
    }
  }, [posts])

  return (
    <div id='custom-home-wrapper' className='px-5 md:px-0'>
      {/* 顶部介绍区 */}
      <section className='max-w-4xl mx-auto mt-10 bg-white dark:bg-[#1e1e1e] dark:text-white rounded-xl p-8 shadow-md border dark:border-gray-700'>
        <h1 className='text-3xl md:text-4xl font-bold mb-6 text-center'>
          漫游思界
        </h1>
        <div className='bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 my-6'>
          <p className='font-bold mb-2'>🚀 欢迎来到漫游思界，探索思维与创意的无限宇宙</p>
          <p className='text-gray-700 dark:text-gray-300'>
            漫游思界是一个专注于青少年科普教育、思维训练、时间管理和游戏设计的知识平台。在这里，我们将带领你穿越思维的星系，发现创造力的无限可能。无论你是学生、家长还是教育工作者，都能在这里找到激发思维的宝贵资源。
          </p>
        </div>
      </section>

      {/* 特色内容区 */}
      <section className='max-w-4xl mx-auto mt-10'>
        <h2 className='text-2xl font-bold mb-6 dark:text-white'>特色内容</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          {/* 特色内容卡片 */}
          <FeatureCard 
            title="高效时间管理方法" 
            category="时间管理" 
            description="适合青少年的时间规划技巧，帮助平衡学习与生活" 
            href="/category/时间管理"
            coverImage="/images/time-management.jpg"
          />
          <FeatureCard 
            title="创意思维训练游戏" 
            category="思维训练" 
            description="10个激发创造力的思维训练方法，提升解决问题能力" 
            href="/category/思维训练"
            coverImage="/images/creative-thinking.jpg"
          />
          <FeatureCard 
            title="趣味科学实验" 
            category="科普教育" 
            description="在家就能完成的有趣科学实验，探索自然奥秘" 
            href="/category/科普教育"
            coverImage="/images/science-experiments.jpg"
          />
        </div>
      </section>

      {/* 栏目导航区 - 第一行 */}
      <section className='max-w-4xl mx-auto mt-16'>
        <div className='grid md:grid-cols-3 gap-6'>
          <CategoryBox 
            title="科普教育" 
            icon="fa-flask" 
            description="探索自然科学的奥秘，通过有趣的实验和案例，激发对知识的好奇心和探索欲..." 
            buttonText="探索" 
            href="/category/科普教育"
          />
          <CategoryBox 
            title="时间管理" 
            icon="fa-clock" 
            description="掌握科学的时间规划方法，提高学习效率，平衡学习、娱乐和休息，成为时间的主人..." 
            buttonText="了解更多" 
            href="/category/时间管理"
          />
          <CategoryBox 
            title="思维训练" 
            icon="fa-brain" 
            description="通过系统的思维训练，提升逻辑思考、创造性思维和问题解决能力..." 
            buttonText="开始训练" 
            href="/category/思维训练"
          />
        </div>
      </section>

      {/* 栏目导航区 - 第二行 */}
      <section className='max-w-4xl mx-auto mt-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <CategoryBox 
            title="游戏设计" 
            icon="fa-gamepad" 
            description="学习游戏设计基础，动手创造自己的游戏，培养编程思维和创造力..." 
            buttonText="设计游戏" 
            href="/category/游戏设计"
          />
          <CategoryBox 
            title="课程中心" 
            icon="fa-book" 
            description="探索系统化的学习课程，从入门到进阶，全面提升各项能力..." 
            buttonText="浏览课程" 
            href="/courses"
          />
        </div>
      </section>

      {/* 最新文章区 */}
      <section className='max-w-4xl mx-auto mt-16'>
        <h2 className='text-2xl font-bold mb-6 dark:text-white'>最新文章</h2>
        <div className='bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md border dark:border-gray-700 overflow-hidden'>
          {featuredPosts && featuredPosts.length > 0 ? (
            <div className='divide-y dark:divide-gray-700'>
              {featuredPosts.map((post, index) => (
                <Link 
                  key={index} 
                  href={post.slug} 
                  className='block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-medium dark:text-white'>{post.title}</h3>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {new Date(post.publishDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className='mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-1'>
                    {post.summary}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className='p-4 text-gray-500 dark:text-gray-400 text-center'>暂无文章</p>
          )}
          <div className='p-4 bg-gray-50 dark:bg-gray-800 text-center'>
            <Link 
              href='/archive' 
              className='text-blue-600 dark:text-blue-400 hover:underline font-medium'>
              查看所有文章 →
            </Link>
          </div>
        </div>
      </section>

      {/* 订阅区 */}
      <section className='max-w-4xl mx-auto mt-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-8 border border-indigo-100 dark:border-indigo-800'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4 dark:text-white'>
            📬 订阅漫游思界
          </h2>
          <p className='mb-6 text-gray-700 dark:text-gray-300 max-w-lg mx-auto'>
            定期获取最新思维训练资源、科普内容和时间管理技巧。订阅我们的更新，不错过任何激发创意的灵感和工具。
          </p>
          <a 
            href={siteConfig('CONTACT_EMAIL') ? `mailto:${siteConfig('CONTACT_EMAIL')}?subject=订阅漫游思界` : '#'} 
            className='inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors'>
            立即订阅
          </a>
        </div>
      </section>

      {/* 关于我简介 */}
      <section className='max-w-4xl mx-auto mt-16 mb-16'>
        <div className='bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md border dark:border-gray-700 overflow-hidden'>
          <div className='md:flex'>
            <div className='md:w-1/3'>
              <div className='h-60 md:h-full bg-gray-200 dark:bg-gray-700'>
                <LazyImage
                  src={siteInfo?.icon || '/images/profile.jpg'}
                  className='w-full h-full object-cover'
                  alt='关于我'
                />
              </div>
            </div>
            <div className='p-6 md:w-2/3'>
              <h2 className='text-2xl font-bold mb-4 dark:text-white'>关于我</h2>
              <p className='text-gray-700 dark:text-gray-300 mb-6'>
                我是漫游思界的创建者，一位专注于青少年教育、思维训练和时间管理的教育工作者。我致力于通过有趣且有效的方法，培养青少年的创造力、批判性思维和自我管理能力。
              </p>
              <Link 
                href='/about' 
                className='inline-block px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors dark:text-white'>
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// 特色内容卡片组件
const FeatureCard = ({ title, category, description, href, coverImage }) => {
  return (
    <div className='bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md border dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow'>
      <div className='h-40 bg-gray-200 dark:bg-gray-700'>
        <LazyImage
          src={coverImage || '/images/default-cover.jpg'} 
          className='w-full h-full object-cover'
          alt={title}
        />
      </div>
      <div className='p-4'>
        <span className='inline-block px-2 py-1 rounded-md text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 mb-2'>
          {category}
        </span>
        <h3 className='font-bold mb-2 dark:text-white'>{title}</h3>
        <p className='text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2'>{description}</p>
        <Link href={href} className='text-blue-600 dark:text-blue-400 hover:underline text-sm'>
          阅读更多 →
        </Link>
      </div>
    </div>
  )
}

// 栏目分类盒子组件
const CategoryBox = ({ title, icon, description, buttonText, href }) => {
  return (
    <div className='bg-white dark:bg-[#1e1e1e] rounded-xl shadow-md border dark:border-gray-700 p-6 hover:shadow-lg transition-shadow'>
      <div className='flex items-center mb-4'>
        <div className='w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3'>
          <i className={`fas ${icon} text-blue-600 dark:text-blue-400`}></i>
        </div>
        <h3 className='text-lg font-bold dark:text-white'>{title}</h3>
      </div>
      <p className='text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-3'>{description}</p>
      <Link 
        href={href} 
        className='inline-block px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-sm dark:text-white'>
        {buttonText}
      </Link>
    </div>
  )
}

export default LayoutIndex