"use client"

import { HttpTypes } from "@medusajs/types"
import { ObjectPlaceholderSvg } from "@modules/common/components/brand-mark"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
  alt: string
}

const ImageGallery = ({ images, alt }: ImageGalleryProps) => {
  const availableImages = images.filter((image) => Boolean(image.url))
  const [activeImageId, setActiveImageId] = useState<string | null>(null)
  const activeIndex = Math.max(
    availableImages.findIndex((image) => image.id === activeImageId),
    0
  )
  const activeImage = availableImages[activeIndex]

  return (
    <div className="w-full">
      <div
        className="relative w-full aspect-square overflow-hidden border-2 border-creata-ink shadow-zine-md bg-creata-cream"
        aria-live="polite"
      >
        <span
          className="absolute top-2.5 left-3 z-10 font-mono text-sm font-bold leading-none text-creata-ink"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute top-2.5 right-3 z-10 font-mono text-sm font-bold leading-none text-creata-ink"
          aria-hidden="true"
        >
          +
        </span>
        <span
          className="absolute bottom-2.5 left-3 z-10 font-mono text-sm font-bold leading-none text-creata-ink"
          aria-hidden="true"
        >
          +
        </span>

        {activeImage?.url ? (
          <Image
            key={activeImage.id}
            src={activeImage.url}
            alt={`${alt}, view ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
            className="object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center bg-creata-lilac-soft">
            <ObjectPlaceholderSvg className="w-40 h-40 sm:w-48 sm:h-48" />
            <div>
              <span className="block font-display font-extrabold uppercase text-base text-creata-ink">
                CREATA 3D
              </span>
              <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-creata-muted mt-0.5">
                Object photo coming soon
              </span>
            </div>
          </div>
        )}

        {availableImages.length > 0 && (
          <span className="absolute right-3 bottom-3 z-10 px-2.5 py-1 bg-creata-yellow border-[1.5px] border-creata-ink shadow-zine-sm font-mono text-[11px] font-bold text-creata-ink">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(availableImages.length).padStart(2, "0")}
          </span>
        )}
      </div>

      {availableImages.length > 1 && (
        <div
          className="flex gap-2.5 overflow-x-auto pt-3 pb-1 no-scrollbar"
          role="group"
          aria-label="Product images"
        >
          {availableImages.map((image, index) => {
            const isSelected = activeIndex === index
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveImageId(image.id)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={isSelected}
                className={`relative flex-none w-[72px] h-[72px] overflow-hidden bg-creata-cream border-2 border-creata-ink transition-all ${
                  isSelected
                    ? "shadow-zine-sm ring-2 ring-creata-yellow"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
