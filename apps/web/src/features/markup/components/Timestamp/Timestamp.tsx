'use client';

import { markupTimestamp } from 'styled-system/recipes';
import type { MarkupTimestampVariantProps } from 'styled-system/recipes';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import { videoSeekerAtom } from '@/states/videoSeeker';
import { useAtomValue } from 'jotai';
import { useCallback } from 'react';

export type TimestampProps = ComponentPropsWithoutRef<'button'> &
  MarkupTimestampVariantProps & {
    t: string; // 秒単位の動画のタイムスタンプ
  };

// 01:23:45 hh:mm:ss のように整形されたタイムスタンプを返す
const calcDisplayT = (t: string): string => {
  const sec = parseInt(t, 10);
  const hh = Math.floor(sec / 3600);
  const mm = Math.floor((sec % 3600) / 60);
  const ss = sec % 60;
  return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
};

export const Timestamp = ({ t, children, ...props }: TimestampProps): ReactNode => {
  const videoSeeker = useAtomValue(videoSeekerAtom);
  const clickHandler = useCallback(() => {
    const sec = parseInt(t, 10);
    videoSeeker.seekTo(sec);
  }, [t, videoSeeker]);
  return (
    <button type="button" className={markupTimestamp()} onClick={clickHandler} {...props}>
      ▶︎ {calcDisplayT(t)}
    </button>
  );
};

// // ------------------
// import { markupTimestamp } from 'styled-system/recipes';
// import type { MarkupTimestampVariantProps } from 'styled-system/recipes';
// import type { ReactNode, ComponentPropsWithoutRef } from 'react';
// import { videoSeekerAtom } from '@/states/videoSeeker';
// import { useAtomValue } from 'jotai';
// import { useCallback } from 'react';

// export type TimestampProps = ComponentPropsWithoutRef<'button'> &
//   MarkupTimestampVariantProps & {
//     t: string; // 秒単位の動画のタイムスタンプ
//   };

// // 01:23:45 hh:mm:ss のように整形されたタイムスタンプを返す
// const calcDisplayT = (t: string): string => {
//   const sec = parseInt(t, 10);
//   const hh = Math.floor(sec / 3600);
//   const mm = Math.floor((sec % 3600) / 60);
//   const ss = sec % 60;
//   return `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
// };

// export const Timestamp = ({ t, children, ...props }: TimestampProps): ReactNode => {
//   return (
//     <button type="button" className={markupTimestamp()} {...props}>
//       ▶︎ {calcDisplayT(t)}
//     </button>
//   );
// };
