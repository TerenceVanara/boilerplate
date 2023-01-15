/* eslint-disable no-console */
import each from 'lodash/each'

import type Page from '$classes/Page'
import Preloader from '$component/Preloader'
import About from '$pages/About'
import Collections from '$pages/Collections'
import Detail from '$pages/Detail'
import Home from '$pages/Home'

window.Webflow ||= []
window.Webflow.push(() => {
  new App()
})

class App {
  content!: HTMLElement | null
  template!: string | null
  pages!: { [key: string]: Page }
  page!: Page
  preloader!: Preloader
  constructor() {
    this.createPreloader()
    this.createContent()
    this.createPage()
    this.addLinkListener()
  }

  createPreloader() {
    this.preloader = new Preloader()
  }

  createContent() {
    this.content = document.querySelector('.page-wrapper')
    if (!this.content) return
    this.template = this.content.getAttribute('data-template')
    console.log(this.template)
  }

  createPage() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    }

    if (!this.template) return
    this.page = this.pages[this.template]

    if (!this.page) return
    this.page.create()
    this.page.show()
  }

  async onchange(url: string) {
    try {
      const request = await window.fetch(url)
      await this.page.hide()

      if (request.status !== 200) throw new Error(`${request} ${request.status}`)

      const html = await request.text()
      const div = document.createElement('div')
      div.innerHTML = html

      const divContent = div.querySelector('.page-wrapper')

      if (!divContent) return
      this.template = divContent.getAttribute('data-template')

      if (!this.content || !divContent || !this.template) return
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = divContent.innerHTML
      this.page = this.pages[this.template]

      if (!this.page) return
      this.page.create()
      this.page.show()
      this.addLinkListener()

      console.log(request)
    } catch (err) {
      console.error(`${err} 💥💥💥`)
    }
  }

  addLinkListener() {
    const links = document.querySelectorAll('a')
    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault()

        const { href } = link

        this.onchange(href)
      }
    })
  }
}
