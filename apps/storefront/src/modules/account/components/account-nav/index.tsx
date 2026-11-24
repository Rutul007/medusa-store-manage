"use client"

import { ArrowRightOnRectangle } from "@medusajs/icons"
import { clx } from "@modules/common/components/ui"
import { useParams, usePathname } from "next/navigation"

import { signout } from "@lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="inline-flex items-center gap-x-2 px-3.5 py-2 border-[1.5px] border-creata-ink bg-creata-yellow font-mono text-xs font-bold uppercase text-creata-ink shadow-zine-sm"
            data-testid="account-main-link"
          >
            <ChevronDown className="transform rotate-90" />
            <span>ACCOUNT</span>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="font-display font-extrabold text-2xl uppercase text-creata-ink mb-4">
              HELLO {customer?.first_name}
            </div>
            <div className="text-sm">
              <ul className="divide-y-2 divide-creata-ink border-y-2 border-creata-ink">
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 hover:bg-creata-yellow-soft px-2"
                    data-testid="profile-link"
                  >
                    <div className="flex items-center gap-x-2.5 text-creata-ink font-mono text-xs font-bold uppercase">
                      <User size={18} />
                      <span>PROFILE</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-creata-ink" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 hover:bg-creata-yellow-soft px-2"
                    data-testid="addresses-link"
                  >
                    <div className="flex items-center gap-x-2.5 text-creata-ink font-mono text-xs font-bold uppercase">
                      <MapPin size={18} />
                      <span>ADDRESSES</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-creata-ink" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 hover:bg-creata-yellow-soft px-2"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2.5 text-creata-ink font-mono text-xs font-bold uppercase">
                      <Package size={18} />
                      <span>ORDERS</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-creata-ink" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 w-full text-creata-ink hover:text-creata-coral font-mono text-xs font-bold uppercase px-2"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2.5">
                      <ArrowRightOnRectangle />
                      <span>LOG OUT</span>
                    </div>
                    <ChevronDown className="transform -rotate-90 text-creata-ink" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      <div className="hidden small:block" data-testid="account-nav">
        <div className="pb-4">
          <span className="inline-flex px-2.5 py-1 border-[1.5px] border-creata-ink bg-creata-yellow font-mono text-[10px] font-bold uppercase tracking-widest text-creata-ink">
            STUDIO ACCOUNT
          </span>
        </div>
        <ul className="flex flex-col gap-y-2 text-sm">
          <li>
            <AccountNavLink
              href="/account"
              route={route!}
              data-testid="overview-link"
            >
              OVERVIEW
            </AccountNavLink>
          </li>
          <li>
            <AccountNavLink
              href="/account/profile"
              route={route!}
              data-testid="profile-link"
            >
              PROFILE
            </AccountNavLink>
          </li>
          <li>
            <AccountNavLink
              href="/account/addresses"
              route={route!}
              data-testid="addresses-link"
            >
              ADDRESSES
            </AccountNavLink>
          </li>
          <li>
            <AccountNavLink
              href="/account/orders"
              route={route!}
              data-testid="orders-link"
            >
              ORDERS
            </AccountNavLink>
          </li>
          <li className="pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-3.5 py-2 border-[1.5px] border-dashed border-creata-ink text-creata-ink hover:bg-creata-coral hover:text-white font-mono text-xs font-bold uppercase transition-colors"
              data-testid="logout-button"
            >
              LOG OUT
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx(
        "block px-3.5 py-2 border-[1.5px] border-creata-ink font-mono text-xs font-bold uppercase transition-colors",
        {
          "bg-creata-ink text-creata-yellow shadow-zine-sm": active,
          "bg-white text-creata-ink hover:bg-creata-yellow": !active,
        }
      )}
      data-testid={dataTestId}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default AccountNav
