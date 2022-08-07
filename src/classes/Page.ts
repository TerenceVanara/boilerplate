/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable no-console */
import GSAP from 'gsap'
import each from 'lodash/each'

export default class Page {
  selector: string
  selectorChildren: { [key: string]: any }
  id: string
  element!: HTMLElement | null
  elements!: { [key: string]: any }
  constructor({ id, element, elements }: { id: string; element: string; elements: object }) {
    this.selector = element
    this.selectorChildren = {
      ...elements,
    }
    this.id = id
  }

  create() {
    if (this.selector != null) {
      this.element = document.querySelector(this.selector)
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
        this.elements[key] = document.querySelectorAll(entry)

        if (this.elements[key].length === 0) {
          this.elements[key] = null
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry)
        }
      }
    })
    console.log('Create', this.id, this.element)
    console.log(this.elements)
  }

  show() {
    return new Promise((resolve) => {
      GSAP.from(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      })
    })
  }
}
