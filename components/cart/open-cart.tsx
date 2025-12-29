import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10 text-[rgb(var(--header-text))] transition-colors hover:bg-white/20">
      <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-[#9C6B2F] text-[11px] font-medium text-[rgb(var(--header-text))]">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
