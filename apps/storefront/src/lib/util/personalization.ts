import { HttpTypes } from "@medusajs/types"

export const PERSONALIZATION_METADATA_KEY = "creata_personalization"

export type PersonalizationSettings = {
  enabled: true
  question: string
  placeholder: string
  required: boolean
  maxLength: number
}

export type PersonalizationValue = {
  question: string
  answer: string
  required: boolean
  maxLength: number
}

export const getPersonalizationSettings = (
  product: Pick<HttpTypes.StoreProduct, "metadata">
): PersonalizationSettings | null => {
  const raw = product.metadata?.[PERSONALIZATION_METADATA_KEY]

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null
  }

  const settings = raw as Record<string, unknown>
  const question = typeof settings.question === "string" ? settings.question.trim() : ""
  const maxLength = Number(settings.maxLength)

  if (settings.enabled !== true || !question || !Number.isInteger(maxLength)) {
    return null
  }

  return {
    enabled: true,
    question,
    placeholder: typeof settings.placeholder === "string" ? settings.placeholder : "",
    required: settings.required !== false,
    maxLength: Math.min(Math.max(maxLength, 1), 100),
  }
}

export const getPersonalizationError = (
  answer: string,
  settings: PersonalizationSettings
) => {
  const value = answer.trim()

  if (settings.required && !value) {
    return "Please enter your personalization."
  }

  if (value.length > settings.maxLength) {
    return `Keep your answer to ${settings.maxLength} characters or fewer.`
  }

  return null
}

