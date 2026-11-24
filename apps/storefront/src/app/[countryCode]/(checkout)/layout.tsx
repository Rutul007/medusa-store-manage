import { BrandLogo } from "@modules/common/components/brand-mark"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full text-creata-ink min-h-screen flex flex-col">
      <div className="h-[72px] bg-creata-cream border-b-2 border-creata-ink sticky top-0 z-40">
        <nav className="flex h-full items-center content-container justify-between gap-4">
          <div className="flex-1 basis-0">
            <LocalizedClientLink
              href="/cart"
              className="inline-flex items-center gap-2 px-3 py-1.5 border-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow font-mono text-[11px] font-bold uppercase tracking-wider text-creata-ink shadow-zine-sm transition-colors"
              data-testid="back-to-cart-link"
            >
              <ChevronDown className="rotate-90" size={14} />
              <span className="hidden small:inline">BACK TO BAG</span>
              <span className="inline small:hidden">BACK</span>
            </LocalizedClientLink>
          </div>
          <LocalizedClientLink
            href="/"
            className="group inline-flex items-center"
            data-testid="store-link"
          >
            <BrandLogo />
          </LocalizedClientLink>
          <div className="flex-1 basis-0 flex justify-end">
            <span className="hidden xsmall:inline-flex px-2.5 py-1 border-[1.5px] border-creata-ink bg-creata-yellow font-mono text-[10px] font-bold uppercase tracking-wider text-creata-ink -rotate-1 shadow-zine-sm">
              CHECKOUT
            </span>
          </div>
        </nav>
      </div>
      <div className="relative flex-1" data-testid="checkout-container">
        {children}
      </div>
      <footer className="py-6 border-t-2 border-creata-ink bg-creata-yellow">
        <div className="content-container flex items-center justify-between text-xs font-mono font-bold uppercase text-creata-ink">
          <span>© {new Date().getFullYear()} CREATA 3D</span>
          <span>SECURE CHECKOUT</span>
        </div>
      </footer>
    </div>
  )
}
