import each from 'lodash/each'
import type { Elements } from 'src/types'

export default class Component {
  selector
  selectorChildren
  parentElement: HTMLElement | null = null
  elements: { [key: string]: unknown } = {}

  constructor({ element, elements }: Elements) {
    this.selector = element
    this.selectorChildren = {
      ...elements,
    }
    this.create()
    // this.addEventListener()
  }

  create() {
    if (!this.selector) return
    this.parentElement = document.querySelector<HTMLElement>(this.selector)
    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof HTMLElement ||
        entry instanceof NodeList ||
        Array.isArray(this.selector)
      ) {
        this.elements[key] = entry
      } else {
        if (!document.querySelector(entry as string)) this.elements[key] = null
        this.elements[key] = document.querySelector(entry as string)
      }
    })
  }

  // addEventListener() {}

  // removeEventListener() {}
}
