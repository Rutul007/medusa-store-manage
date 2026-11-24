"use client"

import { Dialog, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { Locale } from "@lib/data/locales"
import { ArrowRightMini, BarsThree, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { BrandLogo } from "@modules/common/components/brand-mark"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment, useState } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"

const SideMenuItems = [
  { name: "Home", href: "/" },
  { name: "All Objects", href: "/store" },
  { name: "Account", href: "/account" },
  { name: "Print Bag", href: "/cart" },
  { name: "Shipping", href: "/shipping" },
  { name: "Returns", href: "/returns" },
  { name: "Contact", href: "/contact" },
]

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
}

const SideMenu = ({ regions, locales, currentLocale }: SideMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  const close = () => setIsOpen(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        data-testid="nav-menu-button"
        aria-label="Open navigation menu"
        className="inline-flex items-center gap-2 px-3 py-2 border-[1.5px] border-creata-ink bg-white hover:bg-creata-yellow shadow-zine-sm font-mono text-xs font-bold uppercase text-creata-ink transition-colors"
      >
        <BarsThree />
        <span className="hidden xsmall:inline">Menu</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 bg-creata-ink/45"
              data-testid="side-menu-backdrop"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-out duration-250"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel
                  data-testid="nav-menu-popup"
                  className="pointer-events-auto w-screen max-w-[380px] flex flex-col justify-between bg-creata-cream border-r-2 border-creata-ink"
                >
                  <div className="flex items-center justify-between px-5 py-4 bg-creata-yellow border-b-2 border-creata-ink">
                    <BrandLogo />
                    <button
                      type="button"
                      data-testid="close-menu-button"
                      onClick={close}
                      aria-label="Close menu"
                      className="w-9 h-9 border-2 border-creata-ink bg-white shadow-zine-sm hover:bg-creata-mint grid place-items-center text-creata-ink"
                    >
                      <XMark />
                    </button>
                  </div>

                  <ul className="flex flex-col gap-2.5 p-6 overflow-y-auto">
                    {SideMenuItems.map((item) => (
                      <li key={item.href}>
                        <LocalizedClientLink
                          href={item.href}
                          onClick={close}
                          className="font-display font-extrabold text-2xl sm:text-3xl uppercase text-creata-ink hover:bg-creata-yellow px-2 py-1 inline-block transition-colors"
                          data-testid={`${item.name.toLowerCase().replace(/\s+/g, "-")}-link`}
                        >
                          {item.name}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-col gap-y-4 p-6 border-t-2 border-dashed border-creata-ink bg-white text-creata-ink">
                    {!!locales?.length && (
                      <div
                        className="flex items-center justify-between"
                        onMouseEnter={languageToggleState.open}
                        onMouseLeave={languageToggleState.close}
                      >
                        <LanguageSelect
                          toggleState={languageToggleState}
                          locales={locales}
                          currentLocale={currentLocale}
                        />
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            languageToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                    )}
                    <div
                      className="flex items-center justify-between"
                      onMouseEnter={countryToggleState.open}
                      onMouseLeave={countryToggleState.close}
                    >
                      {regions && (
                        <CountrySelect
                          toggleState={countryToggleState}
                          regions={regions}
                        />
                      )}
                      <ArrowRightMini
                        className={clx(
                          "transition-transform duration-150",
                          countryToggleState.state ? "-rotate-90" : ""
                        )}
                      />
                    </div>
                    <Text className="font-mono text-xs font-bold text-creata-muted">
                      © {new Date().getFullYear()} CREATA 3D. ALL RIGHTS RESERVED.
                    </Text>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default SideMenu
