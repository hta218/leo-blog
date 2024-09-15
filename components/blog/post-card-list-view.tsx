import type { CSSProperties } from 'react'
import Image from '~/components/Image'
import Link from '~/components/Link'
import { BlogTags } from '~/components/blog/blog-tags'
import siteMetadata from '~/data/siteMetadata'
import { formatDate } from '~/utils/date'
import type { Blog } from 'contentlayer/generated'
import type { CoreContent } from 'pliny/utils/contentlayer'

export function PostCardListView({ post }: { post: CoreContent<Blog> }) {
  let { slug, date, title, summary, tags, images, readingTime } = post
  return (
    <article>
      <div className="flex flex-col gap-2 space-y-3 md:flex-row md:gap-8">
        <Link href={`/blog/${slug}`} className="block shrink-0">
          <Image
            src={images && images.length > 0 ? images[0] : siteMetadata.socialBanner}
            alt={title}
            width={500}
            height={500}
            className="aspect-video h-auto w-full rounded-xl object-cover object-center md:aspect-auto md:h-80 md:w-72"
          />
        </Link>
        <div className="space-y-5">
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-3">
              <dl className="text-sm">
                <dt className="sr-only">Published on</dt>
                <dd className="font-medium leading-6 text-gray-500 dark:text-gray-400">
                  <time dateTime={date}>{formatDate(date)}</time>
                  <span className="mx-2">{` • `}</span>
                  <span>{Math.ceil(readingTime.minutes)} mins read</span>
                </dd>
              </dl>
              <h2 className="pb-1 text-xl font-bold tracking-tight md:text-2xl">
                <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                  <span
                    data-umami-event="latest-post-title"
                    className="background-underline"
                    style={{ '--duration': '500ms' } as CSSProperties}
                  >
                    {title}
                  </span>
                </Link>
              </h2>
              <BlogTags tags={tags} />
            </div>
            <div className="line-clamp-2 text-gray-500 dark:text-gray-400 md:line-clamp-3">
              {summary}
            </div>
          </div>
          <div className="text-base font-medium leading-6">
            <Link
              href={`/blog/${slug}`}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400"
              aria-label={`Read "${title}"`}
            >
              <span className="background-underline" data-umami-event="latest-post-read-more">
                Read article →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
