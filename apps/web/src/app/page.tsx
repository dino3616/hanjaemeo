import { Calendar } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { ReactNode } from 'react';
import { mdxComponents } from '@/features/markup/components/mdxComponents';
import { allContentDocuments } from 'contentlayer/generated';
import { css } from 'styled-system/css';
import { flex } from 'styled-system/patterns';
import { markupBlockquote, markupHeading, markupHr } from 'styled-system/recipes';

const ABOUT_DOCUMENT_PATH = 'about';

type PageProps = Record<string, never>;

export const generateMetadata = async (_: PageProps, parent: ResolvingMetadata): Promise<Metadata> => {
  // Find the post for the current page.
  const post = allContentDocuments.find(
    (contentDocument) => contentDocument._raw.flattenedPath === ABOUT_DOCUMENT_PATH,
  );

  // 404 if the post does not exist.
  if (!post) throw new Error(`It failed to find the specified post "ABOUT_DOCUMENT_PATH" during metadata generation.`);

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  const titleWithEmoji = [post.emoji, post.title].filter(Boolean).join(' ');

  return {
    title: titleWithEmoji,
    description: post.description,
    openGraph: {
      images: [...previousImages],
    },
  };
};

const Document = (): ReactNode => {
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
          <h1 className={markupHeading({ level: 'title' })}>{titleWithEmoji}</h1>
          <blockquote className={markupBlockquote()}>{post.description}</blockquote>
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
            <Calendar size={16} /> Created on{' '}
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
              timeZone: 'UTC',
            }).format(new Date(post.date))}
          </p>
          <hr className={markupHr()} />
          <MDXContent components={mdxComponents} />
        </main>
      </div>
    </div>
  );
};

export default Document;
