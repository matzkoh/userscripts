/* global $:false */

export class Modal {
  constructor(options) {
    const html = `
      <div class="ytm-ex-modal">
        <div class="ytm-ex-modal-body"></div>
      </div>
    `
    const wrapper = $(html).css({
      position: 'fixed',
      left: '0',
      right: '0',
      top: '0',
      bottom: '0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#0009',
      zIndex: '2147483647',
    })
    const body = wrapper.find('.ytm-ex-modal-body').css({
      padding: '10vw',
      background: '#fffc',
    })

    if (options.closeOnClick) {
      wrapper.on('click', () => this.close())
    }

    this.options = options
    this.wrapper = wrapper
    this.body = body
    this.promise = new Promise(resolve => {
      this._resolvePromise = resolve
    })
  }

  open() {
    this.wrapper.appendTo(document.body)
    return this
  }

  close() {
    this.wrapper.fadeOut().queue(() => {
      this.wrapper.remove()
      this._resolvePromise()
    })
    return this
  }

  static open(options) {
    return new this(options).open()
  }
}

export class AlertModal extends Modal {
  constructor(options) {
    super({ ...options, closeOnClick: true })
    this.body.text(this.options.message).css({
      fontSize: '2vw',
    })
  }
}

export class ProgressModal extends Modal {
  constructor(options) {
    super(options)
    this.value = 0

    this.text = $('<div>').css({
      fontSize: '4vw',
    })

    this.progress = $('<progress/>')
      .attr('max', this.options.maxValue)
      .css({
        width: '50vw',
        height: '2vw',
        backgroundColor: 'transparent',
      })

    this.body
      .css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      })
      .append(this.text)
      .append(this.progress)

    this.update()
  }

  update() {
    this.progress.val(this.value)
    this.text.text(`${((this.value / this.options.maxValue) * 100) | 0}%`)

    if (this.options.maxValue <= this.value) {
      this.body.slideUp().queue(() => this.close())
    }

    return this
  }

  increment(value = 1) {
    this.value += value
    return this.update()
  }
}
