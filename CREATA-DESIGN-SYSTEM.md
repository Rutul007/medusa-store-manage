# CREATA 3D — Design System (Option B: Indie Zine / Soft Neo-Brutalism)

Minimalist, tactile, creative indie-studio design system for the **CREATA 3D** Medusa v2 storefront (`apps/storefront`), matching [option-b-indie-zine.html](file:///e:/MEDUSA/my-store/design-previews/option-b-indie-zine.html).

## 1. Visual Direction

- **Theme:** Indie Zine / Soft Neo-Brutalism — risograph dot-paper canvas, crisp `2px solid #111111` ink outlines, hard offset drop shadows (`4px 4px 0 #111111`), tilted mono stickers, and playful pastel object stages.
- **No emojis** in UI copy, badges, or code.
- **Tactile press interactions:** Primary/secondary controls shift by `2px` on hover/press while compressing their offset shadow.

## 2. Color Tokens (`apps/storefront/tailwind.config.js`)

| Token | Hex | Usage |
| --- | --- | --- |
| `creata-cream` | `#FBF8F1` | Global risograph dot-paper canvas (`radial-gradient(#e6dfd1 1px, transparent 1px)`) |
| `creata-paper` | `#FFFFFF` | Card, modal, drawer, and workbench surfaces |
| `creata-surface` | `#F3EDE0` | Subtle neutral fill inside frames |
| `creata-ink` | `#111111` | Primary text, `2px` ink borders, hard offset shadows, dark banner |
| `creata-muted` | `#57534E` | Secondary body copy and metadata |
| `creata-line` | `#D6CFC0` | Secondary hairline dividers |
| `creata-yellow` | `#FFE14D` | Sunshine Yellow — stickers, price badges, cart button, footer, highlights |
| `creata-coral` | `#FF5E3A` | Electric Coral — primary CTAs (`ADD TO PRINT BAG`, `CHECKOUT`), kickers |
| `creata-lilac` | `#C9B6FF` | Pop Lilac — Hero Studio Proof Window, policy stickers |
| `creata-mint` | `#B8F25A` | Mint Lime — `DROP 04`, in-stock stickers, verification & order confirmation |
| `creata-yellow-soft` | `#FFF6CC` | Pastel card stage / active checkout selection |
| `creata-lilac-soft` | `#EDE6FF` | Pastel card stage / sign-in prompt |
| `creata-mint-soft` | `#E8FBD0` | Pastel card stage |
| `creata-peach-soft` | `#FFE6DE` | Pastel card stage |

## 3. Hard Shadows & Geometry

| Utility | Value | Usage |
| --- | --- | --- |
| `shadow-zine-sm` | `2px 2px 0 #111111` | Stickers, nav pills, pressed hover states |
| `shadow-zine` | `4px 4px 0 #111111` | Buttons, cart item cards, inputs |
| `shadow-zine-md` | `5px 5px 0 #111111` | Product cards, checkout cards, summary boxes |
| `shadow-zine-lg` | `7px 7px 0 #111111` | Hero proof window, Print Lab workbench, 404/policy cards |
| `shadow-zine-coral` | `4px 4px 0 #FF5E3A` | Dark-ink banner accent buttons |

- Sharp corners (`rounded-none`) for primary frames, cards, buttons, and inputs.
- Registration marks (`+`) decorate proof windows and product gallery corners.
- Dashed `2px` dividers (`border-dashed border-creata-ink`) evoke printed studio receipts.

## 4. Typography (`apps/storefront/src/app/layout.tsx`)

- **Display (`font-display`):** `Syne` (700, 800) — uppercase poster headlines and section titles.
- **Body (`font-sans`):** `Plus Jakarta Sans` (400, 500, 600, 700) — readable descriptions and forms.
- **Mono (`font-mono`):** `JetBrains Mono` (500, 700) — prices, SKU/drop tags, stickers, buttons, and Print Lab stamp previews.

## 5. Signature Storefront Patterns

1. **Stamped Brand Mark (`BrandLogo`):** Ink-outlined `CREATA` + yellow `3D` block with optional tilted mint `DROP 04` sticker.
2. **Hero & Studio Proof Window:** Poster headline with `.zine-mark` yellow highlighter behind `"GOOD THINGS."`, Electric Coral primary CTA, and a Pop Lilac proof window with `+` corner marks showcasing live Medusa products.
3. **High-Contrast Marquee Ticker:** Solid `#111111` ticker band with yellow and mint copy (`LAYER HEIGHT 0.16MM`, `PLANT-BASED MATTE PLA`, `MADE TO ORDER IN STUDIO`).
4. **Unified Zine Product Card (`ProductPreview` & `StoreHits`):** Deterministic pastel stages (`yellow-soft`, `lilac-soft`, `mint-soft`, `peach-soft`), tilted `CUSTOM!` / `SALE!` stickers, yellow mono price box, and dashed footer.
5. **Print Lab Ticket Workbench:** On personalizable products, a `.zine-blueprint` live relief proof box renders the customer's custom stamp text in real time and persists `creata_personalization` metadata into the Medusa cart.
6. **Slide-Over Print Bag Drawer:** Triggered from the yellow `CART [N]` header button or immediately upon adding an item, featuring framed line items, yellow `STAMP` badges, `- / +` steppers, and a dashed receipt subtotal.
