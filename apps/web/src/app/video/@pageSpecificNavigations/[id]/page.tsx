'use client';

import { MessageCircle } from 'lucide-react';

import type { ReactNode } from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerScrollArea,
  DrawerKnob,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/Drawer/Drawer';
import { Chat } from '@/features/chat/components/Chat/Chat';
import { NavbarDetailButton, NavbarButtonLabel } from '@/features/navigation/components/Navbar/Navbar';
import { css } from 'styled-system/css';
import { markupHr } from 'styled-system/recipes';

type DocumentPageProps = { params: { id: string } };

const Document = ({ params: { id } }: DocumentPageProps): ReactNode => {
  return (
    <Drawer occupancy="twothird" overlay="transparent" direction="bottom" scrollable modal={false}>
      <DrawerTrigger asChild>
        <NavbarDetailButton aria-label="Open table of contents">
          <NavbarButtonLabel>わからないことを質問</NavbarButtonLabel>
          <MessageCircle />
        </NavbarDetailButton>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerKnob />
          <DrawerClose>Close</DrawerClose>
          <DrawerScrollArea>
            <DrawerTitle>
              <MessageCircle className={css({ display: 'inline' })} size={16} />
              聞いてみよう
            </DrawerTitle>
            <hr className={markupHr()} />
            <Chat videoId={id} />
          </DrawerScrollArea>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default Document;
