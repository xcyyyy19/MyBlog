import React, { DependencyList, useEffect, useMemo, useState } from 'react'
import TableOfContents, { TableOfContentsProps } from '@/components/TableOfContents'
import { getMDXComponent, getMDXExport } from 'mdx-bundler/client'
import Link from 'next/link'
import dayjs from 'dayjs'
import CodeBlock from '@/components/CodeBlock'
import HeroImage from '@/components/HeroImage'
import { useTranslation } from 'next-i18next'
import { HiOutlineClock, HiArrowSmLeft, HiArrowSmRight } from 'react-icons/hi'
import DarkModeToggle from "@/components/DarkModeToggle";

const components = {
  code: CodeBlock,
  DarkModeToggle
}

function useHeadings(deps: DependencyList = []) {
  const [headings, setHeadings] = useState<TableOfContentsProps['headings']>([])

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.markdown-body > h2, .markdown-body > h3, .markdown-body > h4, .markdown-body > h5, .markdown-body > h6'))
      .filter(element => element.id)
      .map(element => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1)),
      }))
    setHeadings(elements)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return headings
}

export interface PostLayoutProps {
  slug: string
  code: string
  frontmatter: PostFrontmatter
  prevPost?: { link: string; title: string }
  nextPost?: { link: string; title: string }
}

const PostLayout: React.FC<PostLayoutProps> = props => {
  const { t } = useTranslation('common')
  const {
    code,
    frontmatter: { title, date, updateOn, tags = [], toc = true, heroImage },
    prevPost,
    nextPost,
  } = props
  const headings = useHeadings([code])
  const Component = useMemo(() => getMDXComponent(code), [code])
  const { readingTime } = useMemo(
    () => getMDXExport<{ readingTime: ReadingTime }, unknown>(code),
    [code],
  )

  return (
    <div className="container break-all">
      <h1 className="mt-14 sm:mt-24 text-2xl sm:text-4xl font-medium">{title}</h1>
      {/* 最后更新时间 */}
      <div className="text-zinc-400 mt-6 sm:mt-12">
        <div className="flex items-center text-sm">
          <i className="flex items-center">
            <HiOutlineClock className="mr-0.5 text-lg" />
            {t('post-page.last-updated')}
            {dayjs(updateOn || date).format('LL')} · {readingTime.text}
          </i>
        </div>
      </div>
      <div className="relative flex w-full">
        <div className="flex-1 w-0">
          {/* 文章顶部图片 */}
          {heroImage && <HeroImage className="mt-6" src={heroImage} />}
          {/* markdown 内容 */}
          <div className="markdown-body w-full mt-10">
            {/* @ts-ignore */}
            <Component components={components} />
          </div>
        </div>
        {/* 侧边目录导航 */}
        {toc && headings.length > 0 && (
          <TableOfContents className="hidden sm:block" headings={headings} />
        )}
      </div>
      {/* 标签 */}
      {tags.length > 0 && (
        <div className="flex items-center justify-center flex-wrap sm:max-w-lg m-auto mt-12 text-sm gap-6">
          {tags.map((tag: string) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <a className="border-b border-current opacity-50 transition before:content-['#'] hover:opacity-100">
                {tag}
              </a>
            </Link>
          ))}
        </div>
      )}
      <hr className="divider" />
      <div className="mb-20 flex justify-between space-x-6 sm:space-x-12 sm:text-xl">
        {/* 下一篇 */}
        <span className="w-1/2">
          {prevPost ? (
            <Link href={prevPost.link}>
              <a className="group flex h-full border border-zinc-500/20 rounded-xl py-3 sm:py-10 px-3 sm:px-6 opacity-70 hover:opacity-100 transition gap-2">
                <HiArrowSmLeft className="shrink-0 text-2xl sm:text-3xl text-[royalblue] transition ease-out-back duration-500 sm:group-hover:-translate-x-2" />
                {prevPost.title}
              </a>
            </Link>
          ) : null}
        </span>
        {/* 上一篇 */}
        <span className="w-1/2 text-right">
          {nextPost ? (
            <Link href={nextPost.link}>
              <a className="group flex h-full border border-zinc-500/20 rounded-xl py-3 sm:py-10 px-3 sm:px-6 opacity-70 hover:opacity-100 transition gap-2">
                {nextPost.title}
                <HiArrowSmRight className="shrink-0 text-2xl sm:text-3xl text-[royalblue] transition ease-out-back duration-500 sm:group-hover:translate-x-2" />
              </a>
            </Link>
          ) : null}
        </span>
      </div>
    </div>
  )
}

export default PostLayout