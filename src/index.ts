/* eslint-disable no-console */
import each from 'lodash/each'

import About from '$pages/About'
import Collections from '$pages/Collections'
import Detail from '$pages/Detail'
import Home from '$pages/Home'
import { greetUser } from '$utils/greet'

window.Webflow ||= []
window.Webflow.push(() => {
  const name = 'John Doe'
  greetUser(name)
})

class App {
  content!: HTMLElement | null
  template!: string | null
  pages!: { [key: string]: object }
  page!: { [key: string]: any }
  constructor() {
    this.createContent()
    this.createPage()
    this.addLinkListener()
  }

  createContent() {
    this.content = document.querySelector('.page-wrapper')
    if (this.content != null) {
      this.template = this.content.getAttribute('data-template')
    }
    console.log(this.template)
  }

  createPage() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    }

    if (this.template != null) {
      this.page = this.pages[this.template]
    }
    if (this.page != null) {
      this.page.create()
      this.page.show()
      // this.page.hide()
    }
  }

  async onchange(url: any) {
    const request = await window.fetch(url)

    await this.page.hide()

    if (request.status === 200) {
      const html = await request.text()
      const div = document.createElement('div')

      div.innerHTML = html

      const divContent = div.querySelector('.page-wrapper')

      if (divContent != null) {
        this.template = divContent.getAttribute('data-template')
      }

      if (this.content != null && divContent != null) {
        this.content.setAttribute('data-template', this.template)
        this.content.innerHTML = divContent.innerHTML
      }

      if (this.template != null) {
        this.page = this.pages[this.template]
      }
      if (this.page != null) {
        this.page.create()
        this.page.show()
      }
    } else {
      console.log('Error')
    }

    console.log(request)
  }

  addLinkListener() {
    const links: object = document.querySelectorAll('a')
    each(links, (link: any) => {
      link.onclick = (event: { preventDefault: () => void }) => {
        event.preventDefault()

        const { href } = link

        this.onchange(href)
      }
    })
  }
}

new App()
