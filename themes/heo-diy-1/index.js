/**
 * HEO Theme - Streamlined Version
 * 
 * Theme originally designed by: Zhang Hong (https://zhheo.com/)
 * Theme development by: tangly1024 (https://github.com/tangly1024)
 * 
 * This file has been refactored for better readability and maintainability.
 * For documentation visit: https://docs.tangly1024.com/article/notionnext-heo
 */

import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadWowJS } from '@/lib/plugins/wow'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Layout Components
import LayoutComponents from './layouts'
import { Style } from './style'
import CONFIG from './config'

// Export all layout components
export const {
  LayoutBase,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutCategoryIndex,
  LayoutTagIndex
} = LayoutComponents

// Export theme config
export const THEME_CONFIG = CONFIG
