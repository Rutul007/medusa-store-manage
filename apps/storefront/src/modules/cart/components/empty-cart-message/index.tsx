import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <section
      className="border-2 border-creata-ink bg-white shadow-zine-lg px-7 py-14 sm:p-14 flex flex-col items-start justify-center"
      data-testid="empty-cart-message"
    >
      <span
        className="w-12 h-12 border-2 border-creata-ink bg-creata-yellow text-creata-ink font-mono text-xl font-bold grid place-items-center shadow-zine-sm mb-6"
        aria-hidden="true"
      >
        +
      </span>
      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-coral">
        ROOM FOR SOMETHING GOOD
      </p>
      <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight leading-[0.98] text-creata-ink max-w-[600px]">
        YOUR PRINT BAG IS EMPTY.
      </h2>
      <p className="mt-3 max-w-[440px] text-sm sm:text-base text-creata-muted leading-relaxed">
        Explore thoughtful 3D printed objects and find a sculptural piece that feels like yours.
      </p>
      <LocalizedClientLink
        className="mt-7 inline-flex items-center gap-3 px-6 py-3.5 border-2 border-creata-ink bg-creata-coral hover:bg-creata-yellow text-white hover:text-creata-ink font-mono text-xs font-bold uppercase tracking-wider shadow-zine transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-zine-sm"
        href="/store"
      >
        <span>EXPLORE THE CATALOG</span>
        <span aria-hidden="true">↗</span>
      </LocalizedClientLink>
    </section>
  )
}

export default EmptyCartMessage
