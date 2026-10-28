import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="brand-hero">
      <div className="brand-hero__copy">
        <p className="eyebrow"><span className="eyebrow__dot" /> Made for everyday wonder</p>
        <h1>Small objects.<br /><em>Big ideas.</em></h1>
        <p className="brand-hero__intro">
          Thoughtful 3D printed pieces that bring a little more character to the spaces you call yours.
        </p>
        <div className="brand-hero__actions">
          <LocalizedClientLink href="/store" className="button button--ink">
            Explore the collection <span aria-hidden="true">↗</span>
          </LocalizedClientLink>
          <span className="brand-hero__note">Designed with curiosity. Made to be kept.</span>
        </div>
        <div className="brand-hero__index"><span>01</span><span className="brand-hero__index-line" /><span>Objects for curious spaces</span></div>
      </div>

      <div className="brand-hero__art" aria-label="A sculptural 3D printed object in a sunlit studio">
        <div className="hero-art__sun" />
        <div className="hero-art__arch" />
        <div className="hero-art__plinth hero-art__plinth--back" />
        <div className="hero-art__vase">
          <span className="hero-art__vase-neck" />
          <span className="hero-art__vase-body" />
          <span className="hero-art__vase-foot" />
          <span className="hero-art__ridges" />
        </div>
        <div className="hero-art__plinth hero-art__plinth--front" />
        <div className="hero-art__caption"><span>FORM STUDY Nº 04</span><span>PLA · 0.2 MM LAYERS</span></div>
        <div className="hero-art__stamp"><span>MADE<br />WITH<br />INTENT</span><span className="hero-art__stamp-star">+</span></div>
      </div>
    </section>
  )
}

export default Hero
