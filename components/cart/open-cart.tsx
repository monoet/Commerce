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
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-[#D8CBBE] bg-white/60 text-[#8A6A3D] transition-colors hover:bg-white/80">
      <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-[#C7A86B] text-[11px] font-medium text-[#8A6A3D]">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
