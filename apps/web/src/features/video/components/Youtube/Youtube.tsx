'use client';
import { videoSeekerAtom } from '@/states/videoSeeker';
import { useAtom } from 'jotai';
import type { ComponentPropsWithoutRef } from 'react';
import { useCallback } from 'react';

import ReactYoutube from 'react-youtube';

export const Youtube = (props: ComponentPropsWithoutRef<typeof ReactYoutube>) => {
  const [, setVideoSeeker] = useAtom(videoSeekerAtom);

  const onReady = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: any) => {
      const seekTo = (second: number) => {
        event.target.seekTo(second, true);
      };
      setVideoSeeker({ seekTo });
    },
    [setVideoSeeker],
  );

  return <ReactYoutube onReady={onReady} {...props} />;
};
