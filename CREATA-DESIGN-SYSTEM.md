# CREATA 3D storefront design system

This document is the working design reference for future storefront changes. Read it before adding or changing a customer-facing page so the experience stays coherent across the home, catalog, product, cart, and checkout flows.

## Brand direction

**Positioning:** a playful design studio for useful, distinctive 3D printed objects.

**Experience goal:** make CREATA products feel considered, tactile, and easy to shop. The visual personality comes from editorial typography, honest product photography, warm materials, and restrained interaction.

**Voice:** direct, curious, warm, and specific. Describe the object and its real product data. Avoid unverified claims about delivery speed, sustainability, materials, handmade production, stock, or returns.

## Visual foundations

### Color

| Token | Value | Use |
| --- | --- | --- |
| `--creata-paper` | `#F6F4ED` | Main page background |
| `--creata-ink` | `#20231E` | Main text and dark buttons |
| `--creata-muted` | `#777A70` | Supporting text |
| `--creata-accent` | `#C5EF59` | Primary purchase action and small highlights |
| `--creata-line` | `#DEDDD3` | Dividers and quiet borders |
| Sage | `#89966B` | Editorial emphasis and secondary accents |
| Soft surface | `#EEEDE5` | Product sections and warm panels |

Keep lime for actions and small moments. Use paper, ink, and sage for most of the page so product photography remains the focus.

### Type

- Use the storefront sans-serif for navigation, body copy, labels, prices, and controls.
- Use a restrained Georgia-style italic for a few expressive words in large headlines.
- Use uppercase labels sparingly, with generous tracking and small sizes.
- Product titles should remain readable and compact. Use large display type for page titles, not every section heading.

### Shape and spacing

- Favor square corners or a small radius. Avoid pill-shaped controls except for small status marks.
- Use thin warm-gray rules to separate information.
- Let product photos occupy large, calm surfaces with minimal framing.
- Keep page widths generous on desktop and use consistent side padding on mobile.

## Interaction principles

- Every interactive element needs a clear hover, keyboard focus, selected, disabled, and loading state where applicable.
- Use short transitions for image zoom, option selection, and button feedback. Respect `prefers-reduced-motion`.
- Make product images browsable with visible thumbnail controls and descriptive accessible labels.
- Keep the mobile add-to-cart action easy to reach. Preserve the existing Medusa variant, stock, and cart behavior.
- Do not add a 3D viewer until suitable web-ready product models are available. Use the image gallery for products with photography only.

## Product cards

Product cards share the same pattern in home collections, catalog results, and related products:

1. Square product image with a soft neutral fallback.
2. Small `CREATA OBJECT` label.
3. Product title on its own line.
4. Region-aware price aligned below the title when a valid price exists.
5. A subtle arrow affordance and restrained image zoom on hover; keep the affordance visible on touch screens.

Cards link to the localized product page. Avoid ratings, badges, sale labels, or product claims unless the backend provides the underlying data.

## Product detail page

Use a two-column desktop layout and a single-column mobile layout:

- **Gallery:** large image stage, selectable thumbnails, and a quiet image count. Update the gallery when a selected variant has its own images.
- **Details:** collection label, product title, optional subtitle and description, selected-variant price, options, availability, and a prominent add-to-cart action.
- **Support content:** show only supplied product specs. Link to the real shipping and return pages instead of making generic promises.
- **Brand story:** one concise studio note below the purchase area.
- **Related products:** a compact grid using the shared product-card design.

On mobile, preserve the storefront's sticky purchase action and keep variant selection available. Do not obscure the gallery or details with sticky UI when the main purchase action is visible.

## Homepage and catalog

- The homepage should introduce the studio, then show purchasable products early enough that visitors can browse without scrolling through a long brand story.
- Use collections as navigation when they contain products. Always keep a clear route to the full catalog.
- The catalog can use Medusa Search for search, filtering, and sorting. Keep its index populated with every storefront currency and the product image fallback.
- Region-aware prices must use the active Medusa region. The current local default is India (`in`); do not hard-code currency symbols in components.

## Cart

- Keep the cart visually connected to the CREATA product experience: warm paper background, ink typography, quiet sage borders, and a lime checkout action.
- Show product image, title, selected variant, unit price, quantity controls, line price, and a clear remove action for each item. Keep prices region-aware through Medusa's cart data.
- Put an order summary beside the item list on desktop and below it on mobile. Keep totals, discount entry, checkout, and shipping/tax context together.
- Quantity changes and removals use the existing Medusa Store API actions, refresh the cart, and expose a clear error if the update fails. Controls need accessible labels and disabled/loading feedback.
- The empty cart should lead directly back to the localized catalog. The compact cart item preview may be reused in checkout, with quantity and price visible but no editing controls.

## Data and integration rules

- Product titles, descriptions, options, availability, prices, and specifications come from Medusa. Do not invent missing product data in UI.
- Use the existing Store API product data for product pages, collections, and cart actions.
- Keep the product search index aligned between `apps/backend/src/search/helpers/pricing.ts` and `apps/storefront/src/lib/search-client.ts`.
- When changing search-index fields, run the Medusa search-index migration and reindex existing products as needed. Product events keep future changes indexed.
- Product and collection fetches use short revalidation windows so Admin updates reach the storefront promptly. Region resolution stays fresh so valid market URLs do not become 404s from stale cached regions.

## Current implementation map

- Shared palette and component styling: `apps/storefront/src/styles/globals.css`
- Homepage: `apps/storefront/src/app/[countryCode]/(main)/page.tsx`, `apps/storefront/src/modules/home/components/hero/`
- Shared product card: `apps/storefront/src/modules/products/components/product-preview/`
- Catalog search cards: `apps/storefront/src/modules/store/components/store-hits/`
- Product detail layout: `apps/storefront/src/modules/products/templates/`
- Cart layout and line items: `apps/storefront/src/modules/cart/templates/`, `apps/storefront/src/modules/cart/components/`
- Product gallery and options: `apps/storefront/src/modules/products/components/image-gallery/`, `apps/storefront/src/modules/products/components/product-actions/`
- Search index: `apps/backend/src/search/product.ts`, `apps/backend/src/search/helpers/pricing.ts`

## Review checklist for future UI work

- Does the page use the CREATA palette, type hierarchy, and spacing?
- Are product cards and prices consistent with the shared card pattern?
- Do controls work with keyboard and touch, with clear selected and disabled states?
- Is the layout usable at mobile, tablet, and desktop widths?
- Is every product claim backed by real Medusa data or the store's actual policy page?
- Are prices and availability based on the active region and selected variant?
