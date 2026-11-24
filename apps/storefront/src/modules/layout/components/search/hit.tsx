"use client"

import Image from "next/image"
import type { Hit as HitType } from "instantsearch.js"

import { ObjectPlaceholderSvg } from "@modules/common/components/brand-mark"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"

export type ProductHit = HitType<{
  title: string | null
  handle: string | null
  thumbnail: string | null
}>

type SearchHitProps = {
  hit: ProductHit
  onNavigate?: () => void
}

const SearchHit = ({ hit, onNavigate }: SearchHitProps) => {
  if (!hit.handle) {
    return null
  }

  return (
    <li>
      <LocalizedClientLink
        href={`/products/${hit.handle}`}
        onClick={onNavigate}
        className="flex items-center gap-x-3.5 border-2 border-creata-ink bg-white p-2.5 shadow-zine-sm hover:bg-creata-yellow transition-colors"
        data-testid="search-hit-link"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden border-[1.5px] border-creata-ink bg-creata-cream flex items-center justify-center">
          {hit.thumbnail ? (
            <Image
              src={hit.thumbnail}
              alt=""
              fill
              sizes="56px"
              className="object-cover object-center"
              draggable={false}
            />
          ) : (
            <ObjectPlaceholderSvg className="w-10 h-10" />
          )}
        </div>
        <Text className="font-display font-extrabold text-sm text-creata-ink line-clamp-2">
          {hit.title}
        </Text>
      </LocalizedClientLink>
    </li>
  )
}

export default SearchHit
