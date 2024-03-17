import { markupWord } from 'styled-system/recipes';
import type { MarkupWordVariantProps } from 'styled-system/recipes';
import type { ReactNode, ComponentPropsWithoutRef } from 'react';

export type WordProps = ComponentPropsWithoutRef<'span'> & MarkupWordVariantProps;

export const Word = ({ type, children, ...props }: WordProps): ReactNode => {
  if (type === 'space')
    return (
      <span className={markupWord({ type })} {...props}>
        <ruby>
          ・<rp>(</rp>
          <rt>・</rt>
          <rp></rp>
        </ruby>
        {children}
      </span>
    );
  return (
    <span className={markupWord({ type })} {...props}>
      {children}
    </span>
  );
};
