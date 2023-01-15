import Page from '$classes/Page'

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home-hero-section',
      elements: {
        navbar: document.querySelector<HTMLElement>('.navbar_component'),
        button: '.button',
      },
    })
  }
}
