"use client"

import { Dialog, Transition } from "@headlessui/react"
import { XMark } from "@medusajs/icons"
import React, { Fragment } from "react"

type SearchDrawerProps = {
  isOpen: boolean
  close: () => void
  children: React.ReactNode
}

const SearchDrawer = ({ isOpen, close, children }: SearchDrawerProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-creata-ink/45" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-250"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel
                className="pointer-events-auto w-screen max-w-md"
                data-testid="search-drawer"
              >
                <div className="flex h-full flex-col border-l-2 border-creata-ink bg-creata-cream">
                  <div className="flex items-center justify-between border-b-2 border-creata-ink bg-creata-yellow px-5 py-4">
                    <div>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-creata-ink">
                        CREATA 3D // SEARCH
                      </span>
                      <Dialog.Title className="font-display font-extrabold text-xl uppercase text-creata-ink">
                        Find Objects
                      </Dialog.Title>
                    </div>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close search"
                      className="w-9 h-9 border-2 border-creata-ink bg-white text-creata-ink shadow-zine-sm hover:bg-creata-mint flex items-center justify-center"
                      data-testid="close-search-drawer"
                    >
                      <XMark />
                    </button>
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SearchDrawer
