import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { ReactNode } from 'react'
import { BannerInfo } from '~/components/blog/banner-info'
import { BlogMeta } from '~/components/blog/blog-meta'
import { Comments } from '~/components/blog/comments'
import { PostTitle } from '~/components/blog/post-title'
import { ScrollButtons } from '~/components/blog/scroll-buttons'
import { SocialShare } from '~/components/blog/social-share'
import { TagsList } from '~/components/blog/tags'
import { TableOfContents } from '~/components/blog/toc'
import { Container } from '~/components/ui/container'
import { GritBackground } from '~/components/ui/grit-background'
import { Image, Zoom } from '~/components/ui/image'
import { SITE_METADATA } from '~/data/site-metadata'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export function PostBanner({ content, children }: LayoutProps) {
  let {
    slug,
    type,
    title,
    images,
    bannerAuthor,
    bannerUrl,
    date,
    lastmod,
    readingTime,
    tags,
    filePath,
    toc,
  } = content
  let displayImage = images?.[0] || SITE_METADATA.socialBanner
  let postUrl = `${SITE_METADATA.siteUrl}/${type.toLowerCase()}/${slug}`

  return (
    <Container className="pt-4 lg:pt-12">
      <ScrollButtons />
      <article className="space-y-6 pt-6 lg:space-y-16">
        <div className="space-y-4">
          <TagsList tags={tags} />
          <PostTitle>{title}</PostTitle>
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <BlogMeta date={date} lastmod={lastmod} slug={slug} readingTime={readingTime} />
            </div>
          </dl>
          <div className="space-y-4 pt-4 md:pt-10">
            <div className="relative lg:-mx-8 xl:-mx-36 2xl:-mx-52">
              <Zoom>
                <Image
                  src={displayImage}
                  alt={title}
                  width={1600}
                  height={900}
                  className="h-auto w-full rounded-lg object-cover object-center"
                />
              </Zoom>
              <GritBackground className="inset-0 rounded-2xl opacity-75" />
            </div>
            <BannerInfo author={bannerAuthor} photoURL={bannerUrl} />
          </div>
          {/* <TableOfContents toc={toc} asDisclosure /> */}
        </div>
        <div className="prose prose-lg max-w-none dark:prose-invert">{children}</div>
        <div className="border-t border-gray-200 dark:border-gray-700 md:pb-10 md:pt-4">
          <SocialShare postUrl={postUrl} title={title} filePath={filePath} />
          <div id="comment">
            <Comments slug={slug} />
          </div>
        </div>
      </article>
    </Container>
  )
}
