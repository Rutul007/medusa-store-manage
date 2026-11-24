import React from "react"

export const BrandLogo = ({
  className = "",
  showTag = false,
}: {
  className?: string
  showTag?: boolean
}) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <span className="px-3 py-1 bg-creata-ink text-creata-yellow font-display font-extrabold text-base sm:text-lg tracking-tight border-2 border-creata-ink shadow-zine-coral transition-transform duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
      CREATA 3D
    </span>
    {showTag && (
      <span className="hidden xsmall:inline-block px-2 py-0.5 bg-creata-mint text-creata-ink border-[1.5px] border-creata-ink font-mono text-[10px] font-bold uppercase -rotate-3">
        DROP 04
      </span>
    )}
  </span>
)

export const ObjectPlaceholderSvg = ({
  className = "w-28 h-28",
}: {
  className?: string
}) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="94" cy="154" rx="46" ry="9" fill="#111111" opacity="0.2" />
    <path
      d="M40 44C40 36 140 36 140 44L130 144C130 152 50 152 50 144L40 44Z"
      fill="#FFE14D"
      stroke="#111111"
      strokeWidth="3.5"
    />
    <path
      d="M56 45L61 148M78 46L80 150M102 46L100 150M124 45L119 148"
      stroke="#111111"
      strokeWidth="2"
    />
    <path
      d="M43 68Q90 77 137 68M46 96Q90 105 134 96M49 124Q90 133 131 124"
      stroke="#FFFFFF"
      strokeWidth="2"
    />
    <ellipse
      cx="90"
      cy="44"
      rx="50"
      ry="11"
      fill="#FF5E3A"
      stroke="#111111"
      strokeWidth="3.5"
    />
    <ellipse cx="90" cy="44" rx="33" ry="6" fill="#111111" />
  </svg>
)
