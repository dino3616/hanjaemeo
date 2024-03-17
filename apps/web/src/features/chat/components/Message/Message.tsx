import { sva } from 'styled-system/css';
// import { createSlotRecipeContext } from '@/states/createSlotRecipeContext';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

const messageSlotRecipe = sva({
  slots: ['container', 'author', 'message'],
  base: {
    container: {
      display: 'flex',
      flexDir: 'column',
      gap: '1',
      justifyContent: 'start',
      alignItems: 'stretch',
      w: 'full',
    },
    author: {
      fontSize: 'sm',
      fontWeight: 'bold',
    },
    message: {
      display: 'flex',
      flexDir: 'column',
      gap: '1',
    },
  },
  variants: {
    author: {
      user: {
        author: {
          color: 'cyan.11',
        },
      },
      ai: {
        author: {
          color: 'purple.11',
        },
      },
    },
  },
});

export type MessageProps = {
  author: 'ai' | 'user';
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const Message = ({ author, children, ...props }: MessageProps) => {
  const styles = messageSlotRecipe({ author });
  return (
    <div className={styles.container} {...props}>
      <p className={styles.author}>
        {author === 'ai' && 'AI'}
        {author === 'user' && 'あなた'}
      </p>
      <div className={styles.message}>{children}</div>
    </div>
  );
};
