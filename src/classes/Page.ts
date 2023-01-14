import GSAP from 'gsap'
import each from 'lodash/each'
import type { Elements } from 'src/types'

export default class Page {
  selector
  selectorChildren
  id
  parentElement: unknown
  elements: { [key: string]: unknown } = {}

  constructor({ id, parentElement, elements }: Elements) {
    this.selector = parentElement
    this.selectorChildren = {
      ...elements,
    }
    this.id = id
  }

  create() {
    if (this.selector != null) {
      this.parentElement = document.querySelector(this.selector)
    }
    this.elements = {}
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
    // console.log('Create', this.id, this.element)
    // console.log(this.elements)
  }

  show() {
    if (!this.parentElement) return
    return new Promise((resolve) => {
      GSAP.from(this.parentElement as HTMLElement, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }

  hide() {
    if (!this.parentElement) return
    return new Promise((resolve) => {
      GSAP.to(this.parentElement as HTMLElement, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }
}
