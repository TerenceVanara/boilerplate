import Component from '$classes/Component'

export default class Preloader extends Component {
  constructor() {
    super({
      parentElement: '.preloader_wrapper',
      elements: {
        title: '.preloader_text',
        number: '.loading_text',
      },
    })

    // console.log(this.parentElement, this.elements)
  }
}
