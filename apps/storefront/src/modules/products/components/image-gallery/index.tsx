"use client"

import { HttpTypes } from "@medusajs/types"
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
    <div className="product-gallery">
      <div className="product-gallery__stage" aria-live="polite">
        {activeImage?.url ? (
          <Image
            key={activeImage.id}
            src={activeImage.url}
            alt={`${alt}, view ${activeIndex + 1}`}
            fill
            priority
            sizes="(max-width: 760px) 100vw, 58vw"
            className="product-gallery__image"
          />
        ) : (
          <div className="product-gallery__empty">
            <span>CREATA 3D</span>
            <small>OBJECT IMAGE COMING SOON</small>
          </div>
        )}
        <span className="product-gallery__count">
          {String(activeIndex + 1).padStart(2, "0")} / {String(availableImages.length).padStart(2, "0")}
        </span>
      </div>

      {availableImages.length > 1 && (
        <div className="product-gallery__thumbnails" role="group" aria-label="Product images">
          {availableImages.map((image, index) => (
            <button
              className="product-gallery__thumbnail"
              key={image.id}
              type="button"
              onClick={() => setActiveImageId(image.id)}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={activeIndex === index}
            >
              <Image
                src={image.url}
                alt=""
                fill
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
