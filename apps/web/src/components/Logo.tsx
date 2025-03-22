import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { MAIN_COLOR, MINOR_COLOR, TITLE } from '@/constants';

interface LogoProps extends ComponentPropsWithoutRef<'div'> {
  size?: string;
}

export function Logo({ size = 'text-5xl', ...props }: LogoProps) {
  return (
    <div
      className={clsx(`font-display font-medium tracking-tight text-slate-700`, size)}
      {...props}
      style={{
        background: `linear-gradient(to right, ${MAIN_COLOR}, ${MINOR_COLOR})`,
        WebkitBackgroundClip: 'text' as any,
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {TITLE}
    </div>
  );
}
