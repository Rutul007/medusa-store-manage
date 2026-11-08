import {
  configureStoreSearch,
  defineMiddlewares,
} from "@medusajs/framework/http"
import type {
  MedusaNextFunction,
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { MedusaError, Modules } from "@medusajs/framework/utils"

const PERSONALIZATION_METADATA_KEY = "creata_personalization"

type PersonalizationSettings = {
  question: string
  required: boolean
  maxLength: number
}

type PersonalizationRequestBody = {
  variant_id?: string
  metadata?: Record<string, unknown> | null
}

const getPersonalizationSettings = (
  metadata: Record<string, unknown> | null | undefined
): PersonalizationSettings | null => {
  const raw = metadata?.[PERSONALIZATION_METADATA_KEY]

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null
  }

  const settings = raw as Record<string, unknown>
  if (settings.enabled !== true) {
    return null
  }

  const question = typeof settings.question === "string" ? settings.question.trim() : ""
  const maxLength = Number(settings.maxLength)

  if (!question || !Number.isInteger(maxLength) || maxLength < 1 || maxLength > 100) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "This product's personalization settings are incomplete. Please contact the store."
    )
  }

  return {
    question,
    required: settings.required !== false,
    maxLength,
  }
}

const getProductSettingsForVariant = async (
  req: MedusaRequest,
  variantId: string
) => {
  const productService = req.scope.resolve(Modules.PRODUCT)
  const variant = await productService.retrieveProductVariant(variantId)
  if (!variant.product_id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "This product variant is not linked to a product."
    )
  }
  const product = await productService.retrieveProduct(variant.product_id, {
    select: ["id", "metadata"],
  })

  return getPersonalizationSettings(product.metadata)
}

const validatePersonalization = async (
  req: MedusaRequest<PersonalizationRequestBody>,
  _: MedusaResponse,
  next: MedusaNextFunction
) => {
  try {
    const validatedBody = req.validatedBody as PersonalizationRequestBody | undefined
    const body = validatedBody && Object.keys(validatedBody).length > 0
      ? validatedBody
      : req.body ?? {}
    const hasPersonalization = Object.prototype.hasOwnProperty.call(
      body.metadata ?? {},
      PERSONALIZATION_METADATA_KEY
    )
    const isLineItemUpdate = Boolean(req.params.line_id)

    if (isLineItemUpdate && !hasPersonalization) {
      return next()
    }

    let variantId = body.variant_id
    if (isLineItemUpdate) {
      const cartService = req.scope.resolve(Modules.CART)
      const lineItem = await cartService.retrieveLineItem(req.params.line_id)
      variantId = lineItem.variant_id
    }

    if (!variantId) {
      return next()
    }

    const settings = await getProductSettingsForVariant(req, variantId)
    const rawValue = body.metadata?.[PERSONALIZATION_METADATA_KEY]

    if (!settings) {
      if (rawValue !== undefined) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "This product does not accept personalization."
        )
      }
      return next()
    }

    if (rawValue === undefined) {
      if (settings.required) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Please enter the requested personalization before adding this product."
        )
      }
      return next()
    }

    if (rawValue === "" && !settings.required) {
      return next()
    }

    if (!rawValue || typeof rawValue !== "object" || Array.isArray(rawValue)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Enter the personalization as text."
      )
    }

    const answer = (rawValue as Record<string, unknown>).answer
    if (typeof answer !== "string") {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Enter the personalization as text."
      )
    }

    const normalizedAnswer = answer.trim()
    if (settings.required && !normalizedAnswer) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Please enter the requested personalization before adding this product."
      )
    }
    if (normalizedAnswer.length > settings.maxLength) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Keep your personalization to ${settings.maxLength} characters or fewer.`
      )
    }

    if (!normalizedAnswer) {
      const metadata = { ...(body.metadata ?? {}) }
      delete metadata[PERSONALIZATION_METADATA_KEY]
      body.metadata = metadata
    } else {
      body.metadata = {
        ...(body.metadata ?? {}),
        [PERSONALIZATION_METADATA_KEY]: {
          question: settings.question,
          answer: normalizedAnswer,
          required: settings.required,
          maxLength: settings.maxLength,
        },
      }
    }

    req.body = body
    req.validatedBody = body
    next()
  } catch (error) {
    next(error)
  }
}

// The product index declares filterable `status` and `sales_channel_ids`, so
// the route narrows it to published products in the key's sales channels.
export default defineMiddlewares({
  routes: [
    {
      methods: ["POST"],
      matcher: "/store/search",
      middlewares: [
        configureStoreSearch({
          allowed_indexes: {
            product: true,
          },
        }),
      ],
    },
    {
      methods: ["POST"],
      matcher: "/store/carts/:id/line-items",
      middlewares: [validatePersonalization],
    },
    {
      methods: ["POST"],
      matcher: "/store/carts/:id/line-items/:line_id",
      middlewares: [validatePersonalization],
    },
  ],
})
