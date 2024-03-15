import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import type { FC, ReactNode } from 'react';
import { Header } from '@/features/navigation/components/Header/Header';
import { AppProvider } from '@/providers';
import { fontVariables } from '@/styles/fonts';
import { baseUrl } from '@/utils/routes/baseUrl';
import { css } from 'styled-system/css';
import '@/styles/globals.css';

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  // `next-themes`プロバイダによるHydration差分を無視するため`suppressHydrationWarning`を付加する
  // 参照: https://github.com/pacocoursey/next-themes/issues/152
  // 参照: https://github.com/khinshankhan/next-themes-app-dir-example
  <html lang="ja" suppressHydrationWarning className={fontVariables}>
    <head />
    <body
      className={css({
        display: 'flex',
        minH: 'screen',
        flexDir: 'column',
        bg: 'keyplate.1',
        color: 'keyplate.12',
        overflowX: 'hidden',
      })}
    >
      {/* Refer: https://vercel.com/docs/concepts/analytics/quickstart */}
      <Analytics />
      <AppProvider>
        <Header />
        {children}
      </AppProvider>
    </body>
  </html>
);

export default RootLayout;

const defaultTitle = '한잼어 ハンジェモ' as const;
const defaultDescription = '韓国語を好きなもので楽しく学ぼう' as const;

export const metadata: Metadata = {
  metadataBase: baseUrl,

  title: {
    default: defaultTitle,
    template: '%s | 한잼어',
  },
  description: defaultDescription,
  openGraph: {
    // Open graph image will be provided via file-based configuration.
    // Refer: https://beta.nextjs.org/docs/api-reference/metadata#static-images
    type: 'website',
    locale: 'ja_JP',
    title: defaultTitle,
    description: defaultDescription,
    url: baseUrl,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};
