export interface Elements {
  id?: string
  parentElement: string
  elements: { [key: string]: string | HTMLElement | NodeList | null }
}
