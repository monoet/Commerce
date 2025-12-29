import CartModal from 'components/cart/modal';
import LogoIcon from 'components/icons/logo';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgb(var(--border))/0.9] bg-[rgb(var(--bg))/0.72] text-[rgb(var(--fg))] backdrop-blur-xl">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.10))]" />
      <div className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            prefetch={true}
            className="mr-2 flex w-full items-center justify-center gap-3 md:w-auto lg:mr-6"
          >
            <div className="logo-mark text-[rgb(var(--accent))]">
              <LogoIcon className="h-[64px] w-[64px]" />
            </div>
            <div className="relative top-[1px] flex-none font-medium uppercase tracking-[0.22em] text-[#8B5E26] md:hidden lg:block md:text-base">
              {SITE_NAME}
            </div>
          </Link>
          {menu.length ? (
            <ul className="hidden gap-6 text-sm md:flex md:items-center">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    prefetch={true}
                    className="text-sm text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--fg))]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}
