import { convertToLocale } from "@lib/util/money"
import { formatDayRange, StorePolicies } from "@lib/util/store-policies"

export const formatShippingRate = (rate: number, currencyCode: string) =>
  rate === 0
    ? "Free"
    : convertToLocale({ amount: rate, currency_code: currencyCode })

export const PolicyPage = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="py-10 sm:py-16" data-testid="policy-page">
    <div className="content-container max-w-3xl">
      <div className="border-2 border-creata-ink bg-white shadow-zine-lg p-7 sm:p-12">
        <span className="inline-flex px-3 py-1 border-[1.5px] border-creata-ink bg-creata-lilac font-mono text-[11px] font-bold uppercase tracking-widest text-creata-ink -rotate-1 shadow-zine-sm">
          POLICY // CREATA 3D
        </span>
        <h1 className="mt-4 mb-8 font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight leading-[0.98] text-creata-ink">
          {title}
        </h1>
        <div className="flex flex-col gap-6 text-base leading-relaxed text-creata-muted">
          {children}
        </div>
      </div>
    </div>
  </div>
)

export const PoliciesUnavailable = () => (
  <p className="text-creata-muted">
    Policy details for this region haven&apos;t been published yet.
  </p>
)

export const ShippingSummary = ({
  policies,
  currencyCode,
}: {
  policies: StorePolicies
  currencyCode: string
}) => (
  <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-2 border-creata-ink bg-creata-yellow-soft shadow-zine-sm p-5 text-sm">
    <dt className="font-mono text-xs font-bold uppercase tracking-wider text-creata-ink">
      SHIPPING RATE
    </dt>
    <dd className="font-mono font-bold text-creata-ink">
      {formatShippingRate(policies.shippingRate, currencyCode)}
    </dd>
    <dt className="font-mono text-xs font-bold uppercase tracking-wider text-creata-ink">
      PROCESSING TIME
    </dt>
    <dd className="font-mono font-bold text-creata-ink">
      {formatDayRange(policies.handlingDays)} business days
    </dd>
    <dt className="font-mono text-xs font-bold uppercase tracking-wider text-creata-ink">
      DELIVERY TIME
    </dt>
    <dd className="font-mono font-bold text-creata-ink">
      {formatDayRange(policies.transitDays)} business days after dispatch
    </dd>
  </dl>
)

export const PlaceholderNotice = () => (
  <p className="text-sm text-creata-muted" data-testid="policy-placeholder">
    Store policy details are being updated. Contact our studio team for specific questions before ordering.
  </p>
)
