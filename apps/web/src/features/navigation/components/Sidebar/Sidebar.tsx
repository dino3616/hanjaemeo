import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { getDocumentLinkTreeMetadata } from '../../utils/getDocumentLinkTreeMetadata';
import { DocumentLinkTree } from '../DocumentLinkTree/DocumentLinkTree';
import { cx, sva, type RecipeVariantProps } from 'styled-system/css';
import { markupHr } from 'styled-system/recipes';
import { DocumentLink } from '../DocumentLink/DocumentLink';
import type { DocumentLinkTreeMetadata } from '../../types/DocumentLinkMetadata';
export const sidebarSlotRecipe = sva({
  slots: ['container', 'treelist'],
  base: {
    container: {
      display: 'flex',
      flexDir: 'column',
      gap: '2',
      alignItems: 'stretch',
      justifyContent: 'start',
      p: '4',
    },
    treelist: {
      display: 'flex',
      flexDir: 'column',
      gap: '2',
      w: 'full',
    },
  },
  variants: {
    hasPadding: {
      true: {
        container: {
          p: '4',
        },
      },
      false: {
        container: {
          p: '0',
        },
      },
    },
  },
  defaultVariants: {
    hasPadding: true,
  },
});

export type SidebarProps = RecipeVariantProps<typeof sidebarSlotRecipe> & ComponentPropsWithoutRef<'nav'>;

const favoriteLinkTreeMetadata: DocumentLinkTreeMetadata = {
  title: 'お気に入り',
  description: 'あなたがお気に入りに追加した動画・テキスト',
  emoji: '💕',
  slug: ['favorite'], // Dummy
  href: '#',
};

const historyLinkTreeMetadata: DocumentLinkTreeMetadata = {
  title: '閲覧履歴',
  description: 'あなたが最近見た動画・テキスト',
  emoji: '🕒',
  slug: ['history'], // Dummy
  href: '#',
};

export const Sidebar = ({ className, hasPadding, ...props }: SidebarProps): ReactNode => {
  const { container, treelist } = sidebarSlotRecipe({ hasPadding });
  const rootTrees = getDocumentLinkTreeMetadata();

  return (
    <nav className={cx(container, className)} {...props}>
      <ol className={cx(treelist)}>
        {rootTrees.map((rootTree) => (
          <DocumentLinkTree key={rootTree.slug[0]} metadata={rootTree} />
        ))}
        <DocumentLinkTree metadata={favoriteLinkTreeMetadata} />
        <DocumentLinkTree metadata={historyLinkTreeMetadata} />
      </ol>
    </nav>
  );
};
