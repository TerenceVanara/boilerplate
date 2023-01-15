export interface Elements {
  id?: string
  element: string
  elements: { [key: string]: string | HTMLElement | NodeList | null }
}

export interface PageInterface {
  id?: string
  parentElement: HTMLElement | null
  elements: { [key: string]: string | HTMLElement | NodeList | null }

  create: () => void
  show: () => Promise
  hide: () => Promise
}
