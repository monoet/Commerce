import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare({ size }: { size?: 'sm' | undefined }) {
  return (
    <div
      className={clsx(
        'logo-mark flex flex-none items-center justify-center border border-[rgb(var(--border))] bg-[rgb(var(--bg))] transition-colors',
        {
          'h-9 w-9 rounded-xl md:h-11 md:w-11': !size,
          'h-8 w-8 rounded-lg md:h-10 md:w-10': size === 'sm'
        }
      )}
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
