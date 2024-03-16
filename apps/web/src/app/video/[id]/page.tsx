import { Calendar } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ReactElement } from 'react';
import { mdxComponents } from '@/features/markup/components/mdxComponents';
import { allContentDocuments } from 'contentlayer/generated';
import { css, cx } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { markupBlockquote, markupHeading, markupHr } from 'styled-system/recipes';
import { YouTubeEmbed } from '@next/third-parties/google';
import { Youtube } from '@/features/video/components/Youtube/Youtube';
import { fetchYoutubeVideoInfo } from '@/features/video/utils/fetchYoutubeVideoInfo';

const ABOUT_DOCUMENT_PATH = 'sample';

type PageProps = { params: { id: string } };

export const generateMetadata = async ({ params: { id } }: PageProps, parent: ResolvingMetadata): Promise<Metadata> => {
  const videoInfo = await fetchYoutubeVideoInfo(id);

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `한잼어 ${videoInfo.title}`,
    description: `한잼어で、韓国語の動画で楽しく学ぼう`,
    openGraph: {
      images: [...previousImages],
    },
  };
};

const Document = async ({ params: { id } }: PageProps): Promise<ReactElement> => {
  // Find the post for the current page.
  const post = allContentDocuments.find(
    (contentDocument) => contentDocument._raw.flattenedPath === ABOUT_DOCUMENT_PATH,
  );

  // 404 if the post does not exist.
  if (!post) notFound();

  // Read the MDX file metadata.
  const titleWithEmoji = [post.emoji, post.title].filter(Boolean).join(' ');

  // Parse the MDX file via the useMDXComponent hook.
  const MDXContent = useMDXComponent(post.body.code);

  const videoInfo = await fetchYoutubeVideoInfo(id);

  return (
    <div
      className={css({
        pos: 'relative',
        w: 'full',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'start',
        lgDown: {
          gridTemplateColumns: '0 100% 0',
          gap: '0',
        },
        lgToXl: {
          gridTemplateColumns: '1fr auto 0',
          gap: '4',
        },
        xl: {
          gridTemplateColumns: '1fr auto 1fr',
          gap: '4',
        },
      })}
    >
      <div
        className={css({
          gridColumn: '2 / 3',
          w: {
            base: 'full',
            lg: '800px',
          },
          display: 'flex',
          flexDir: 'column',
          justifyContent: 'start',
          alignItems: 'center',
        })}
      >
        <main
          className={flex({
            maxW: '800px',
            w: 'full',
            direction: 'column',
            justify: 'start',
            textAlign: 'start',
            lineHeight: '1.5',
            p: '6',
          })}
        >
          <h1 className={markupHeading({ level: 'title' })}>{videoInfo.title}</h1>
          <blockquote
            className={cx(
              markupBlockquote(),
              css({
                lineClamp: '4',
              }),
            )}
          >
            {videoInfo.description}
          </blockquote>
          {!!videoInfo.publishedAt && (
            <p
              className={css({
                fontFamily: 'heading',
                color: 'keyplate.11',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                gap: '1',
                flexDir: 'row',
                my: '2',
              })}
            >
              <Calendar size={16} />
              {new Intl.DateTimeFormat('ja-JP', {
                dateStyle: 'long',
                timeStyle: 'short',
                timeZone: 'UTC',
              }).format(new Date(videoInfo.publishedAt))}{' '}
              に投稿
            </p>
          )}
          <hr className={markupHr()} />
          <div
            className={css({
              w: 'calc(token(sizes.full) + token(sizes.6) * 2)',
              pos: 'sticky',
              zIndex: '10',
              aspectRatio: '16 / 9',
              top: {
                base: '16',
              },
              m: '-6',
              rounded: 'lg',
              overflow: 'hidden',
              md: {
                w: 'full',
                top: '6',
                m: '0',
              },
              '& .youtube-container': {
                pos: 'relative',
                w: 'full',
                aspectRatio: '16 / 9',
              },
              '& .youtube-iframe': {
                w: 'full',
                h: 'full',
              },
            })}
          >
            <Youtube
              videoId={id}
              iframeClassName="youtube-iframe"
              className="youtube-container"
              opts={{
                autoplay: 1,
                loop: 1,
              }}
            />
          </div>
          <hr className={markupHr()} />
          <MDXContent components={mdxComponents} />
        </main>
      </div>
    </div>
  );
};

export default Document;
