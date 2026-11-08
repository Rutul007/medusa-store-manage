import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types"
import { Container, Heading, Text } from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"

const PERSONALIZATION_METADATA_KEY = "creata_personalization"

const OrderPersonalizationWidget = ({
  data: order,
}: DetailWidgetProps<AdminOrder>) => {
  const { data, isLoading } = useQuery({
    queryKey: ["creata-order-personalization", order.id],
    queryFn: () => sdk.admin.order.retrieve(order.id, { fields: "+items.metadata" }),
  })

  const items = data?.order.items ?? order.items ?? []
  const personalizedItems = items.flatMap((item) => {
    const raw = item.metadata?.[PERSONALIZATION_METADATA_KEY]
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
      return []
    }

    const personalization = raw as Record<string, unknown>
    if (typeof personalization.answer !== "string" || !personalization.answer) {
      return []
    }

    return [{
      id: item.id,
      title: item.product_title,
      question: typeof personalization.question === "string"
        ? personalization.question
        : "Personalization",
      answer: personalization.answer,
      quantity: item.quantity,
    }]
  })

  if (isLoading && !data) {
    return (
      <Container>
        <Heading level="h2">Personalized items</Heading>
        <Text size="small" className="text-ui-fg-subtle mt-2">Loading item details…</Text>
      </Container>
    )
  }

  if (!personalizedItems.length) {
    return null
  }

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h2">Personalized items</Heading>
        <Text size="small" className="text-ui-fg-subtle mt-1">
          Customer text to use when preparing this order.
        </Text>
      </div>
      <div className="divide-y">
        {personalizedItems.map((item) => (
          <div key={item.id} className="grid gap-1 px-6 py-4">
            <Text size="small" weight="plus">
              {item.title} {item.quantity > 1 && `(quantity ${item.quantity})`}
            </Text>
            <Text size="small" className="text-ui-fg-subtle">{item.question}</Text>
            <Text size="small" className="font-semibold">{item.answer}</Text>
          </div>
        ))}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "order.details",
})

export default OrderPersonalizationWidget
