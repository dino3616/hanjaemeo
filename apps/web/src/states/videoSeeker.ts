import { atom } from 'jotai';

// 動画を指定秒数へシークするための関数のAtom
export type VideoSeeker = {
  seekTo: (second: number) => void;
};

export const videoSeekerAtom = atom<VideoSeeker>({
  seekTo: () => {
    throw new Error('videoSeekerAtom is not provided');
  },
});
