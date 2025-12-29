'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();

  return (
    <form action="/search" className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        key={searchParams?.get('q')}
        type="text"
        name="q"
        placeholder="Search for products..."
        autoComplete="off"
        defaultValue={searchParams?.get('q') || ''}
        className="text-md w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))/0.7] px-4 py-2 text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--border))] md:text-sm"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}

export function SearchSkeleton() {
  return (
    <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        placeholder="Search for products..."
        className="w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--card))/0.7] px-4 py-2 text-sm text-[rgb(var(--fg))] placeholder:text-[rgb(var(--muted))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--border))]"
      />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <MagnifyingGlassIcon className="h-4" />
      </div>
    </form>
  );
}
