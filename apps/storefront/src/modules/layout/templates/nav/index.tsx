import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import { BrandLogo } from "@modules/common/components/brand-mark"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import Search from "@modules/layout/components/search"
import SideMenu from "@modules/layout/components/side-menu"

const NAV_ITEMS = [
  { label: "Catalog", href: "/store" },
  { label: "Shipping", href: "/shipping" },
  { label: "Contact", href: "/contact" },
]

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative min-h-[72px] border-b-2 border-creata-ink bg-creata-cream">
        <nav className="content-container flex items-center justify-between w-full py-3.5 gap-4">
          <div className="flex items-center gap-3 flex-1 basis-0">
            <SideMenu
              regions={regions}
              locales={locales}
              currentLocale={currentLocale}
            />
            <LocalizedClientLink
              href="/"
              className="group inline-flex items-center"
              data-testid="nav-store-link"
            >
              <BrandLogo showTag />
            </LocalizedClientLink>
          </div>

          <div className="hidden small:flex items-center gap-2.5">
            {NAV_ITEMS.map((item) => (
              <LocalizedClientLink
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 border-[1.5px] border-creata-ink bg-white font-mono text-xs font-bold uppercase text-creata-ink hover:bg-creata-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-zine-sm transition-all duration-150"
              >
                {item.label}
              </LocalizedClientLink>
            ))}
            <LocalizedClientLink
              href="/account"
              className="px-3.5 py-2 border-[1.5px] border-creata-ink bg-white font-mono text-xs font-bold uppercase text-creata-ink hover:bg-creata-yellow hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-zine-sm transition-all duration-150"
              data-testid="nav-account-link"
            >
              Account
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-2.5 flex-1 basis-0 justify-end">
            <Search />
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="inline-flex items-center gap-2 px-4 py-2.5 border-2 border-creata-ink bg-creata-yellow text-creata-ink font-mono text-xs font-bold uppercase shadow-zine"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <span>CART</span>
                  <span>[0]</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
