import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { Button, Container, Heading, Input, Text, toast } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { sdk } from "../lib/sdk"

const PERSONALIZATION_METADATA_KEY = "creata_personalization"

type PersonalizationDraft = {
  enabled: boolean
  question: string
  placeholder: string
  required: boolean
  maxLength: number
}

const getDraft = (product: AdminProduct): PersonalizationDraft => {
  const raw = product.metadata?.[PERSONALIZATION_METADATA_KEY]
  const settings = raw && typeof raw === "object" && !Array.isArray(raw)
    ? raw as Record<string, unknown>
    : {}

  return {
    enabled: settings.enabled === true,
    question: typeof settings.question === "string" ? settings.question : "",
    placeholder: typeof settings.placeholder === "string" ? settings.placeholder : "",
    required: settings.required !== false,
    maxLength: typeof settings.maxLength === "number" && Number.isInteger(settings.maxLength)
      ? Math.min(Math.max(settings.maxLength, 1), 100)
      : 24,
  }
}

const ProductPersonalizationWidget = ({
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const [draft, setDraft] = useState(() => getDraft(product))
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(getDraft(product))
  }, [product.id, product.metadata])

  const updateDraft = <K extends keyof PersonalizationDraft>(
    key: K,
    value: PersonalizationDraft[K]
  ) => setDraft((current) => ({ ...current, [key]: value }))

  const save = async () => {
    const question = draft.question.trim()
    if (draft.enabled && !question) {
      toast.error("Add the question customers should answer.")
      return
    }

    if (!Number.isInteger(draft.maxLength) || draft.maxLength < 1 || draft.maxLength > 100) {
      toast.error("Character limit must be between 1 and 100.")
      return
    }

    setSaving(true)
    try {
      await sdk.admin.product.update(product.id, {
        metadata: {
          [PERSONALIZATION_METADATA_KEY]: {
            ...draft,
            question,
            maxLength: draft.maxLength,
          },
        },
      })
      toast.success("Personalization settings saved.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save personalization settings.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Personalization</Heading>
          <Text size="small" className="text-ui-fg-subtle mt-1">
            Ask customers for text to print on this product.
          </Text>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={draft.enabled}
            onChange={(event) => updateDraft("enabled", event.target.checked)}
          />
          Enabled
        </label>
      </div>

      {draft.enabled && (
        <div className="grid gap-4 px-6 py-5 md:grid-cols-2">
          <label className="flex flex-col gap-1.5 md:col-span-2">
            <Text size="small" weight="plus">Customer question</Text>
            <Input
              value={draft.question}
              onChange={(event) => updateDraft("question", event.target.value)}
              placeholder="What name should we print on your kitchen?"
              maxLength={160}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <Text size="small" weight="plus">Input placeholder</Text>
            <Input
              value={draft.placeholder}
              onChange={(event) => updateDraft("placeholder", event.target.value)}
              placeholder="Enter a name"
              maxLength={80}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <Text size="small" weight="plus">Character limit</Text>
            <Input
              type="number"
              min={1}
              max={100}
              value={draft.maxLength}
              onChange={(event) => updateDraft("maxLength", Number(event.target.value))}
            />
          </label>
          <label className="flex items-center gap-2 md:col-span-2">
            <input
              type="checkbox"
              checked={draft.required}
              onChange={(event) => updateDraft("required", event.target.checked)}
            />
            <Text size="small">Require an answer before adding to cart</Text>
          </label>
          <div className="flex justify-end md:col-span-2">
            <Button onClick={save} isLoading={saving} disabled={saving}>
              Save personalization
            </Button>
          </div>
        </div>
      )}

      {!draft.enabled && (
        <div className="flex justify-end px-6 py-4">
          <Button onClick={save} isLoading={saving} disabled={saving}>
            Save personalization
          </Button>
        </div>
      )}
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details",
})

export default ProductPersonalizationWidget
