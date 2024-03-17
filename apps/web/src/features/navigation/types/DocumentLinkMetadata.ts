import type { LinkProps } from 'next/link';

export type DocumentLinkMetadata = {
  emoji?: string;
  title: string;
  description: string;
  slug: string[];
  href: LinkProps['href'];
};

export type DocumentLinkTreeMetadata = DocumentLinkMetadata & {
  children?: DocumentLinkTreeMetadata[];
};
