import { Metadata } from "next"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-76px)] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full border-2 border-creata-ink bg-white shadow-zine-lg p-8 sm:p-10 text-center flex flex-col items-center gap-4">
        <span className="px-3 py-1 border-[1.5px] border-creata-ink bg-creata-yellow text-creata-ink font-mono text-xs font-bold uppercase tracking-widest -rotate-2 shadow-zine-sm">
          404 // NOT FOUND
        </span>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase text-creata-ink">
          PAGE NOT FOUND
        </h1>
        <p className="text-sm text-creata-muted leading-relaxed">
          The page you tried to access does not exist or may have moved off the print bed.
        </p>
        <LocalizedClientLink
          className="mt-2 inline-flex items-center gap-2.5 px-6 py-3 border-2 border-creata-ink bg-creata-coral hover:bg-creata-yellow text-white hover:text-creata-ink font-mono text-xs font-bold uppercase tracking-wider shadow-zine transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-zine-sm"
          href="/"
        >
          <span>BACK TO CREATA 3D</span>
          <span aria-hidden="true">↗</span>
        </LocalizedClientLink>
      </div>
    </div>
  )
}
