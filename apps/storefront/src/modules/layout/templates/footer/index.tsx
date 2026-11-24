import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { BrandLogo } from "@modules/common/components/brand-mark"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Text } from "@modules/common/components/ui"

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  const topCategories = (productCategories ?? []).filter(
    (category) => !category.parent_category_id
  )

  return (
    <footer className="w-full border-t-2 border-creata-ink bg-creata-yellow text-creata-ink">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-10 py-14 small:flex-row">
          <div className="max-w-[290px]">
            <LocalizedClientLink href="/" className="group inline-flex">
              <BrandLogo />
            </LocalizedClientLink>
            <p className="mt-4 font-mono text-xs leading-relaxed text-creata-ink">
              Artistic 3D printed objects made one layer at a time—built for curious desks, shelves, and everyday life.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-xs sm:grid-cols-3">
            {topCategories.length > 0 && (
              <div className="flex flex-col gap-y-2.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-ink">
                  Explore
                </span>
                <ul className="flex flex-col gap-2">
                  {topCategories.slice(0, 6).map((category) => (
                    <li key={category.id}>
                      <LocalizedClientLink
                        className="inline-block px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono font-bold uppercase transition-colors"
                        href={`/categories/${category.handle}`}
                      >
                        {category.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {collections?.length > 0 && (
              <div className="flex flex-col gap-y-2.5">
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-ink">
                  Collections
                </span>
                <ul className="flex flex-col gap-2">
                  {collections.slice(0, 6).map((collection) => (
                    <li key={collection.id}>
                      <LocalizedClientLink
                        className="inline-block px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono font-bold uppercase transition-colors"
                        href={`/collections/${collection.handle}`}
                      >
                        {collection.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col gap-y-2.5">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-creata-ink">
                Customer Care
              </span>
              <ul className="flex flex-col gap-2">
                <li>
                  <LocalizedClientLink
                    className="inline-block px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono font-bold uppercase transition-colors"
                    href="/shipping"
                  >
                    Shipping
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="inline-block px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono font-bold uppercase transition-colors"
                    href="/returns"
                  >
                    Returns
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="inline-block px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono font-bold uppercase transition-colors"
                    href="/contact"
                  >
                    Contact
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    className="inline-block px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono font-bold uppercase transition-colors"
                    href="/privacy"
                  >
                    Privacy
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-5 flex w-full items-center justify-between border-t-2 border-dashed border-creata-ink text-xs">
          <Text className="font-mono text-xs font-bold text-creata-ink">
            © {new Date().getFullYear()} CREATA 3D // PRINTED LAYER BY LAYER
          </Text>
          <LocalizedClientLink
            className="px-2.5 py-1 border-[1.5px] border-creata-ink bg-white hover:bg-creata-mint font-mono text-xs font-bold uppercase text-creata-ink"
            href="/terms"
          >
            Terms
          </LocalizedClientLink>
        </div>
      </div>
    </footer>
  )
}
