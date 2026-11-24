"use client"

import { useSortBy } from "react-instantsearch"

import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import {
  CATEGORY_ATTRIBUTE,
  LABELS_ATTRIBUTE,
  getSortOptions,
} from "./attributes"
import CurrentRefinements from "./current-refinements"
import OnSaleToggle from "./on-sale-toggle"
import OptionRefinements from "./option-refinements"
import PriceRange from "./price-range"
import RefinementGroup from "./refinement-group"

const SortProducts = ({ currencyCode }: { currencyCode: string }) => {
  const items = getSortOptions(currencyCode)
  const { currentRefinement, refine } = useSortBy({ items })

  return (
    <FilterRadioGroup
      title="Sort by"
      items={items}
      value={currentRefinement}
      handleChange={refine}
      data-testid="sort-by-container"
    />
  )
}

const StoreRefinements = ({ currencyCode }: { currencyCode: string }) => {
  return (
    <div className="flex flex-col gap-6">
      <SortProducts currencyCode={currencyCode} />
      <CurrentRefinements currencyCode={currencyCode} />
      <OptionRefinements />
      <PriceRange currencyCode={currencyCode} />
      <OnSaleToggle currencyCode={currencyCode} />
      <RefinementGroup attribute={CATEGORY_ATTRIBUTE} title="Category" />
      <RefinementGroup attribute={LABELS_ATTRIBUTE} title="Labels" />
    </div>
  )
}

export default StoreRefinements
