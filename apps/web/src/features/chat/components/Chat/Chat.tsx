'use client';

import { useChat } from 'ai/react';
import { Send } from 'lucide-react';
import { ComponentPropsWithoutRef } from 'react';
import { Input } from '@/components/Input/Input';
import { env } from '@/env';
import { css, cx } from 'styled-system/css';
import { Message } from '../Message/Message';

export type ChatProps = {
  videoId: string;
};

// 8MhHGucpOSI
export const Chat = ({ videoId }: ChatProps) => {
  const { messages, input, isLoading, handleInputChange, handleSubmit } = useChat({
    api: `${env.NEXT_PUBLIC_CHAT_API_ENDPOINT}/${videoId}`,
    onResponse: (response) => {
      console.log('response', response);
    },
  });

  return (
    <>
      {messages.map((m, index) => (
        // <li key={index}>
        //   {m.role === 'user' ? 'User: ' : 'AI: '}
        //   {m.content}
        // </li>
        <Message key={index} author={m.role === 'user' ? 'user' : 'ai'}>
          {m.content}
        </Message>
      ))}
      <form
        onSubmit={handleSubmit}
        className={css({
          pos: 'absolute',
          bottom: '2',
          left: '0',
          right: '0',
          display: 'flex',
          flexDir: 'row',
          gap: '2',
          alignItems: 'center',
          w: 'full',
        })}
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder={'ここに質問を入力...'}
          aria-label="ここに質問を入力"
          className={css({
            flexGrow: 1,
            h: '12',
          })}
          data-vaul-no-drag
        />
        <button
          type="submit"
          data-vaul-no-drag
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            h: '12',
            w: '12',
            bg: 'cyan.9',
            color: 'cyan.1',
            rounded: 'lg',
          })}
        >
          <Send />
        </button>
        {isLoading && <span>...</span>}
      </form>
    </>
  );
};
