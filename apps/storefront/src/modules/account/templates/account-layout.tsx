import React from "react"

import { HttpTypes } from "@medusajs/types"
import UnderlineLink from "@modules/common/components/interactive-link"
import AccountNav from "../components/account-nav"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div
      className="flex-1 py-8 sm:py-12"
      data-testid="account-page"
    >
      <div className="content-container">
        <div className="border-2 border-creata-ink bg-white shadow-zine-md p-6 sm:p-10 flex flex-col">
          <div className="grid grid-cols-1 small:grid-cols-[240px_1fr] gap-8 pb-10">
            <div>{customer && <AccountNav customer={customer} />}</div>
            <div className="flex-1 min-w-0">{children}</div>
          </div>
          <div className="flex flex-col small:flex-row items-start small:items-end justify-between border-t-2 border-dashed border-creata-ink pt-8 gap-6">
            <div>
              <h3 className="font-display font-extrabold text-xl uppercase text-creata-ink mb-2">
                GOT QUESTIONS?
              </h3>
              <span className="text-sm text-creata-muted">
                Reach out to our studio team directly or browse our shipping and returns pages.
              </span>
            </div>
            <div>
              <UnderlineLink href="/contact">Contact Studio</UnderlineLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
