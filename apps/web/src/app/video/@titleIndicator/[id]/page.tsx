// import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { NavbarTitle } from '@/features/navigation/components/Navbar/Navbar';
import { fetchYoutubeVideoInfo } from '@/features/video/utils/fetchYoutubeVideoInfo';

type DocumentPageProps = { params: { id: string } };

const Document = async ({ params: { id } }: DocumentPageProps): Promise<ReactElement> => {
  const videoInfo = await fetchYoutubeVideoInfo(id);
  return <NavbarTitle>{videoInfo.title}</NavbarTitle>;
};

export default Document;
