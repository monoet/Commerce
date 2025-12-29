import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx('logo-mark flex flex-none items-center justify-center transition-colors', {
        'h-8 w-8 md:h-10 md:w-10': !size,
        'h-7 w-7 md:h-9 md:w-9': size === 'sm'
      })}
    >
      <LogoIcon
        className={clsx({
        'h-5 w-5 md:h-6 md:w-6': !size,
        'h-4 w-4 md:h-5 md:w-5': size === 'sm'
      })}
      />
    </div>
  );
}
