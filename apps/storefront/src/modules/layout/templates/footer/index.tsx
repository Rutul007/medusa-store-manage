import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const [{ collections }, productCategories] = await Promise.all([
    listCollections({ fields: "id,handle,title" }),
    listCategories({
      fields:
        "id,name,handle,parent_category_id,category_children.id,category_children.name,category_children.handle",
    }),
  ])

  return (
    <footer className="w-full border-t border-[#deddd3] bg-[#f6f4ed]">
      <div className="content-container flex w-full flex-col">
        <div className="flex flex-col items-start justify-between gap-y-10 py-20 xsmall:flex-row">
          <div className="max-w-[230px]">
            <LocalizedClientLink href="/" className="text-lg font-semibold tracking-[0.14em] text-[#20231e]">
              CREATA 3D
            </LocalizedClientLink>
            <p className="mt-4 text-small-regular text-ui-fg-subtle">Thoughtful objects, made one layer at a time.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-small-regular sm:grid-cols-3">
            {productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-ui-fg-base">Explore</span>
                <ul className="grid grid-cols-1 gap-2">
                  {productCategories.slice(0, 6).map((category) =>
                    category.parent_category_id ? null : (
                      <li key={category.id} className="text-ui-fg-subtle">
                        <LocalizedClientLink className="hover:text-ui-fg-base" href={`/categories/${category.handle}`}>
                          {category.name}
                        </LocalizedClientLink>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
            {collections?.length > 0 && (
              <div className="flex flex-col gap-y-3">
                <span className="txt-small-plus text-ui-fg-base">Collections</span>
                <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle">
                  {collections.slice(0, 6).map((collection) => (
                    <li key={collection.id}>
                      <LocalizedClientLink className="hover:text-ui-fg-base" href={`/collections/${collection.handle}`}>
                        {collection.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-3">
              <span className="txt-small-plus text-ui-fg-base">Customer care</span>
              <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle">
                <li><LocalizedClientLink className="hover:text-ui-fg-base" href="/shipping">Shipping</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-ui-fg-base" href="/returns">Returns</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-ui-fg-base" href="/contact">Contact</LocalizedClientLink></li>
                <li><LocalizedClientLink className="hover:text-ui-fg-base" href="/privacy">Privacy</LocalizedClientLink></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-10 flex w-full justify-between border-t border-[#deddd3] pt-5 text-ui-fg-muted">
          <Text className="txt-compact-small">© {new Date().getFullYear()} CREATA 3D. Made with care.</Text>
          <LocalizedClientLink className={clx("txt-compact-small", "hover:text-ui-fg-base")} href="/terms">Terms</LocalizedClientLink>
        </div>
      </div>
    </footer>
  )
}
