import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx('logo-mark flex flex-none items-center justify-center transition-colors', {
        'h-9 w-9 md:h-11 md:w-11': !size,
        'h-8 w-8 md:h-10 md:w-10': size === 'sm'
      })}
    >
      <LogoIcon
        className={clsx({
        'h-6 w-6 md:h-7 md:w-7': !size,
        'h-5 w-5 md:h-6 md:w-6': size === 'sm'
      })}
      />
    </div>
  );
}
