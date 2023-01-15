export interface Elements {
  id?: string
  element: string
  elements: { [key: string]: string | HTMLElement | NodeList | null }
}
