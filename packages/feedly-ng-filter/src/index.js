// ==UserScript==
// @name           Feedly NG Filter
// @namespace      https://github.com/matzkoh
// @version        1.0.0
// @description    ルールにマッチするアイテムを既読にして取り除きます。ルールは正規表現で記述でき、複数のルールをツリー状に組み合わせることができます。
// @author         matzkoh
// @include        https://feedly.com/*
// @icon           https://raw.githubusercontent.com/matzkoh/userscripts/master/packages/feedly-ng-filter/images/icon.png
// @screenshot     https://raw.githubusercontent.com/matzkoh/userscripts/master/packages/feedly-ng-filter/images/screenshot.png
// @run-at         document-start
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_unregisterMenuCommand
// @grant          GM_log
// ==/UserScript==

const fs = require('fs')

const notificationDefaults = {
  title: 'Feedly NG Filter',
  icon: GM_info.script.icon,
  tag: 'feedly-ng-filter',
  autoClose: 5000,
}

const CSS_STYLE_TEXT = fs.readFileSync('src/generic.scss', 'utf-8') + fs.readFileSync('src/style.scss', 'utf-8')

function __(strings, ...values) {
  let key = values.map((v, i) => `${strings[i]}{${i}}`).join('') + strings[strings.length - 1]

  if (!(key in __.data)) {
    throw new Error(`localized string not found: ${key}`)
  }

  return __.data[key].replace(/\{(\d+)\}/g, (_, cap) => values[cap])
}

Object.defineProperties(__, {
  config: {
    configurable: true,
    writable: true,
    value: {
      defaultLocale: 'en-US',
    },
  },

  locales: {
    configurable: true,
    writable: true,
    value: {},
  },

  data: {
    configurable: true,
    get() {
      return this.locales[this.config.locale]
    },
  },

  languages: {
    configurable: true,
    get() {
      return Object.keys(this.locales)
    },
  },

  add: {
    configurable: true,
    writable: true,
    value: function add({ locale, data }) {
      if (locale in this.locales) {
        throw new Error(`failed to add existing locale: ${locale}`)
      }

      this.locales[locale] = data
    },
  },

  use: {
    configurable: true,
    writable: true,
    value: function use(locale) {
      if (locale in this.locales) {
        this.config.locale = locale
      } else if (this.config.defaultLocale) {
        this.config.locale = this.config.defaultLocale
      } else {
        throw new Error(`unknown locale: ${locale}`)
      }
    },
  },
})

__.add({
  locale: 'en-US',
  data: {
    'Feedly NG Filter': 'Feedly NG Filter',
    OK: 'OK',
    Cancel: 'Cancel',
    Add: 'Add',
    Copy: 'Copy',
    Paste: 'Paste',
    'New Filter': 'New Filter',
    'Rule Name': 'Rule Name',
    'No Rules': 'No Rules',
    Title: 'Title',
    URL: 'URL',
    'Feed Title': 'Feed Title',
    'Feed URL': 'Feed URL',
    Author: 'Author',
    Keywords: 'Keywords',
    Contents: 'Contents',
    'Ignore Case': 'Ignore Case',
    Edit: 'Edit',
    Delete: 'Delete',
    'Hit Count:\t{0}': 'Hit Count:\t{0}',
    'Last Hit:\t{0}': 'Last Hit:\t{0}',
    'NG Setting': 'NG Setting',
    Setting: 'Setting',
    'Import Configuration': 'Import Configuration',
    'Preferences were successfully imported.': 'Preferences were successfully imported.',
    'Export Configuration': 'Export Configuration',
    Language: 'Language',
    'NG Settings were modified.\nNew filters take effect after next refresh.':
      'NG Settings were modified.\nNew filters take effect after next refresh.',
  },
})

__.add({
  locale: 'ja',
  data: {
    'Feedly NG Filter': 'Feedly NG Filter',
    OK: 'OK',
    Cancel: 'キャンセル',
    Add: '追加',
    Copy: 'コピー',
    Paste: '貼り付け',
    'New Filter': '新しいフィルタ',
    'Rule Name': 'ルール名',
    'No Rules': 'ルールはありません',
    Title: 'タイトル',
    URL: 'URL',
    'Feed Title': 'フィードのタイトル',
    'Feed URL': 'フィードの URL',
    Author: '著者',
    Keywords: 'キーワード',
    Contents: '本文',
    'Ignore Case': '大/小文字を区別しない',
    Edit: '編集',
    Delete: '削除',
    'Hit Count:\t{0}': 'ヒット数:\t{0}',
    'Last Hit:\t{0}': '最終ヒット:\t{0}',
    'NG Setting': 'NG 設定',
    Setting: '設定',
    'Import Configuration': '設定をインポート',
    'Preferences were successfully imported.': '設定をインポートしました',
    'Export Configuration': '設定をエクスポート',
    Language: '言語',
    'NG Settings were modified.\nNew filters take effect after next refresh.':
      'NG 設定を更新しました。\n新しいフィルタは次回読み込み時から有効になります。',
  },
})

__.use(navigator.language)

class Serializer {
  static stringify(value, space) {
    return JSON.stringify(
      value,
      (key, value) => {
        if (value instanceof RegExp) {
          return {
            __serialized__: true,
            class: 'RegExp',
            args: [value.source, value.flags],
          }
        }

        return value
      },
      space,
    )
  }

  static parse(text) {
    return JSON.parse(text, (key, value) => {
      if (value?.__serialized__) {
        switch (value.class) {
          case 'RegExp':
            return new RegExp(...value.args)
        }
      }

      return value
    })
  }
}

class EventEmitter {
  constructor() {
    this.listeners = {}
  }

  on(type, listener) {
    if (type.trim().includes(' ')) {
      type.match(/\S+/g).forEach(t => this.on(t, listener))
      return
    }

    if (!(type in this.listeners)) {
      this.listeners[type] = new Set()
    }

    const set = this.listeners[type]

    for (const fn of set.values()) {
      if (EventEmitter.compareListener(fn, listener)) {
        return
      }
    }

    set.add(listener)
  }

  async once(type, listener) {
    return new Promise((resolve, reject) => {
      function wrapper(event) {
        this.off(wrapper)

        try {
          EventEmitter.applyListener(this, listener, event)
          resolve(event)
        } catch (e) {
          reject(e)
        }
      }

      wrapper[EventEmitter.original] = listener

      this.on(type, wrapper)
    })
  }

  off(type, listener) {
    if (!listener || !(type in this.listeners)) {
      return
    }

    const set = this.listeners[type]

    for (const fn of set.values()) {
      if (EventEmitter.compareListener(fn, listener)) {
        set.delete(fn)
      }
    }
  }

  removeAllListeners(type) {
    delete this.listeners[type]
  }

  dispatchEvent(event) {
    event.timestamp = Date.now()

    if (event.type in this.listeners) {
      this.listeners[event.type].forEach(listener => {
        try {
          EventEmitter.applyListener(this, listener, event)
        } catch (e) {
          setTimeout(() => throw e, 0)
        }
      })
    }

    return !event.canceled
  }

  emit(type, data) {
    const event = this.createEvent(type)
    Object.assign(event, data)
    return this.dispatchEvent(event)
  }

  createEvent(type) {
    return new Event(type, this)
  }

  static compareListener(a, b) {
    return a === b || a === b[EventEmitter.original] || a[EventEmitter.original] === b
  }

  static applyListener(target, listener, ...args) {
    if (typeof listener === 'function') {
      listener.apply(target, args)
    } else {
      listener.handleEvent(...args)
    }
  }
}

EventEmitter.original = Symbol('fngf.original')

class Event {
  constructor(type, target) {
    this.type = type
    this.target = target
    this.canceled = false
    this.timestamp = 0
  }

  preventDefault() {
    this.canceled = true
  }
}

class DataTransfer extends EventEmitter {
  set(type, data) {
    this.purge()
    this.type = type
    this.data = data
    this.emit(type, { data })
  }

  purge() {
    this.emit('purge', { data: this.data })
    delete this.data
  }

  cut(data) {
    this.set('cut', data)
  }

  copy(data) {
    this.set('copy', data)
  }

  receive() {
    const data = this.data

    if (this.type === 'cut') {
      this.purge()
    }

    return data
  }
}

class MenuCommand {
  constructor(label, oncommand) {
    this.label = label
    this.oncommand = oncommand
  }

  register() {
    if (typeof GM_registerMenuCommand === 'function') {
      this.uuid = GM_registerMenuCommand(`${__`Feedly NG Filter`} - ${this.label}`, this.oncommand)
    }

    if (MenuCommand.contextmenu) {
      this.menuitem = $el`<menuitem label="${this.label}" @click="${this.oncommand}">`.first
      MenuCommand.contextmenu.appendChild(this.menuitem)
    }
  }

  unregister() {
    if (typeof GM_unregisterMenuCommand === 'function') {
      GM_unregisterMenuCommand(this.uuid)
    }

    delete this.uuid
    document.adoptNode(this.menuitem)
  }

  static register(...args) {
    const c = new MenuCommand(...args)
    c.register()
    return c
  }
}

MenuCommand.contextmenu = null

class Preference extends EventEmitter {
  constructor() {
    super()

    if (Preference._instance) {
      return Preference._instance
    }

    Preference._instance = this
    this.dict = {}
  }

  has(key) {
    return key in this.dict
  }

  get(key, def) {
    return this.has(key) ? this.dict[key] : def
  }

  set(key, newValue) {
    const prevValue = this.dict[key]

    if (newValue !== prevValue) {
      this.dict[key] = newValue
      this.emit('change', { key, prevValue, newValue })
    }

    return newValue
  }

  del(key) {
    if (!this.has(key)) {
      return
    }

    const prevValue = this.dict[key]

    delete this.dict[key]

    this.emit('delete', {
      key,
      prevValue,
    })
  }

  load(str) {
    str ||= GM_getValue(Preference.prefName, Preference.defaultPref || '({})')

    let obj

    try {
      obj = Serializer.parse(str)
    } catch (e) {
      if (e instanceof SyntaxError) {
        obj = eval(`(${str})`)
      }
    }

    if (!obj || typeof obj !== 'object') {
      return
    }

    this.dict = {}

    for (const key in obj) {
      this.set(key, obj[key])
    }

    this.emit('load')
  }

  write() {
    this.dict.__version__ = GM_info.script.version
    this.dict |> ::Serializer.stringify |> (_ => GM_setValue(Preference.prefName, _))
  }

  autosave() {
    if (this.autosaveReserved) {
      return
    }

    window.addEventListener('unload', ::this.write, false)
    this.autosaveReserved = true
  }

  exportToFile() {
    const blob = new Blob([this.serialize()], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    location.assign(url)
    URL.revokeObjectURL(url)
  }

  importFromString(str) {
    try {
      this.load(str)
    } catch (e) {
      if (!(e instanceof SyntaxError)) {
        throw e
      }

      notify(e)

      return false
    }

    notify(__`Preferences were successfully imported.`)

    return true
  }

  importFromFile() {
    openFilePicker().then(([file]) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => this.importFromString(reader.result), false)
      reader.readAsText(file)
    })
  }

  toString() {
    return '[object Preference]'
  }

  serialize() {
    return Serializer.stringify(this.dict)
  }
}

Preference.prefName = 'settings'

class Draggable {
  constructor(element, ignore = 'select, button, input, textarea, [tabindex]') {
    this.element = element
    this.ignore = ignore
    this.attach()
  }

  isDraggableTarget(target) {
    if (!target) {
      return false
    }

    if (target === this.element) {
      return true
    }

    return !target.matches(`${this.ignore}, :-webkit-any(${this.ignore}) *`)
  }

  attach() {
    this.element.addEventListener('mousedown', this, false, false)
  }

  detach() {
    this.element.removeEventListener('mousedown', this, false)
  }

  handleEvent(event) {
    const name = `on${event.type}`

    if (name in this) {
      this[name](event)
    }
  }

  onmousedown(event) {
    if (event.button !== 0) {
      return
    }

    if (!this.isDraggableTarget(event.target)) {
      return
    }

    event.preventDefault()

    this.element.querySelector(':focus')?.blur()

    this.offsetX = event.pageX - this.element.offsetLeft
    this.offsetY = event.pageY - this.element.offsetTop

    document.addEventListener('mousemove', this, true, false)
    document.addEventListener('mouseup', this, true, false)
  }

  onmousemove(event) {
    event.preventDefault()
    this.element.style.left = `${event.pageX - this.offsetX}px`
    this.element.style.top = `${event.pageY - this.offsetY}px`
  }

  onmouseup(event) {
    if (event.button === 0) {
      event.preventDefault()
      document.removeEventListener('mousemove', this, true)
      document.removeEventListener('mouseup', this, true)
    }
  }
}

class Filter {
  constructor(filter = {}) {
    this.name = filter.name || ''
    this.regexp = { ...filter.regexp }
    this.children = filter.children?.map(f => new Filter(f)) || []
    this.hitcount = filter.hitcount || 0
    this.lasthit = filter.lasthit || 0
  }

  test(entry) {
    let name

    for (name in this.regexp) {
      if (!this.regexp[name].test(entry[name] || '')) {
        return false
      }
    }

    const hit = this.children.length ? this.children.some(filter => filter.test(entry)) : !!name

    if (hit && entry.unread) {
      this.hitcount++
      this.lasthit = Date.now()
    }

    return hit
  }

  appendChild(filter) {
    if (!(filter instanceof Filter)) {
      return null
    }

    this.removeChild(filter)
    this.children.push(filter)
    this.sortChildren()

    return filter
  }

  removeChild(filter) {
    if (!(filter instanceof Filter)) {
      return null
    }

    const index = this.children.indexOf(filter)

    if (index !== -1) {
      this.children.splice(index, 1)
    }

    return filter
  }

  sortChildren() {
    return this.children.sort((a, b) => b.name < a.name)
  }
}

class Entry {
  constructor(data) {
    this.data = data
  }

  get title() {
    const value = $el`<div>${this.data.title || ''}`.first.textContent

    Object.defineProperty(this, 'title', { configurable: true, value })

    return value
  }

  get id() {
    return this.data.id
  }

  get url() {
    return this.data.alternate?.[0]?.href
  }

  get sourceTitle() {
    return this.data.origin.title
  }

  get sourceURL() {
    return this.data.origin.streamId.replace(/^[^/]+\//, '')
  }

  get body() {
    return (this.data.content || this.data.summary)?.content
  }

  get author() {
    return this.data.author
  }

  get recrawled() {
    return this.data.recrawled
  }

  get published() {
    return this.data.published
  }

  get updated() {
    return this.data.updated
  }

  get keywords() {
    return this.data.keywords?.join(',') || ''
  }

  get unread() {
    return this.data.unread
  }

  get tags() {
    return this.data.tags.map(tag => tag.label)
  }
}

class Panel extends EventEmitter {
  constructor() {
    super()

    this.opened = false

    const onSubmit = event => {
      event.preventDefault()
      event.stopPropagation()
      this.apply()
    }

    const onKeyPress = event => {
      if (event.keyCode === KeyboardEvent.DOM_VK_ESCAPE) {
        this.emit('escape')
      }
    }

    const { element, body, buttons } = $el`
      <form class="fngf-panel" @submit="${onSubmit}" @keydown="${onKeyPress}" ref="element">
        <input type="submit" style="display: none;">
        <div class="fngf-panel-body fngf-column" ref="body"></div>
        <div class="fngf-panel-buttons fngf-row" ref="buttons">
          <div class="fngf-btn-group fngf-row">
            <button type="button" class="fngf-btn" @click="${::this.apply}">${__`OK`}</button>
            <button type="button" class="fngf-btn" @click="${::this.close}">${__`Cancel`}</button>
          </div>
        </div>
      </form>
    `

    new Draggable(element)

    this.dom = {
      element,
      body,
      buttons,
    }
  }

  open(anchorElement) {
    if (this.opened) {
      return
    }

    if (!this.emit('showing')) {
      return
    }

    if (anchorElement?.nodeType !== 1) {
      anchorElement = null
    }

    document.body.appendChild(this.dom.element)

    this.opened = true
    this.snapTo(anchorElement)

    if (anchorElement) {
      const onWindowResize = () => this.snapTo(anchorElement)
      window.addEventListener('resize', onWindowResize, false)
      this.on('hidden', () => window.removeEventListener('resize', onWindowResize, false))
    }

    document.querySelector(':focus')?.blur()

    const selector = ':not(.feedlyng-panel) > :-webkit-any(button, input, select, textarea, [tabindex])'
    const ctrl = Array.from(this.dom.element.querySelectorAll(selector)).sort(
      (a, b) => (b.tabIndex || 0) < (a.tabIndex || 0),
    )[0]

    if (ctrl) {
      ctrl.focus()

      if (ctrl.select) {
        ctrl.select()
      }
    }

    this.emit('shown')
  }

  apply() {
    if (this.emit('apply')) {
      this.close()
    }
  }

  close() {
    if (!this.opened) {
      return
    }

    if (!this.emit('hiding')) {
      return
    }

    document.adoptNode(this.dom.element)
    this.opened = false

    this.emit('hidden')
  }

  toggle(anchorElement) {
    if (this.opened) {
      this.close()
    } else {
      this.open(anchorElement)
    }
  }

  moveTo(x, y) {
    this.dom.element.style.left = `${x}px`
    this.dom.element.style.top = `${y}px`
  }

  snapTo(anchorElement) {
    const pad = 5
    let x = pad
    let y = pad

    if (anchorElement) {
      let { left, bottom: top } = anchorElement.getBoundingClientRect()

      left += pad
      top += pad

      const { width, height } = this.dom.element.getBoundingClientRect()
      const right = left + width + pad
      const bottom = top + height + pad
      const { innerWidth, innerHeight } = window

      if (innerWidth < right) {
        left -= right - innerWidth
      }

      if (innerHeight < bottom) {
        top -= bottom - innerHeight
      }

      x = Math.max(x, left)
      y = Math.max(y, top)
    }

    this.moveTo(x, y)
  }

  getFormData(asElement) {
    const data = {}
    const elements = this.dom.body.querySelectorAll('[name]')

    function getValue(el) {
      if (el.localName === 'input' && (el.type === 'checkbox' || el.type === 'radio')) {
        return el.checked
      }

      return 'value' in el ? el.value : el.getAttribute('value')
    }

    for (const el of elements) {
      const value = asElement ? el : getValue(el)
      const path = el.name.split('.')
      let leaf = path.pop()

      const cd = path.reduce((parent, key) => {
        if (!(key in parent)) {
          parent[key] = {}
        }

        return parent[key]
      }, data)

      if (leaf.endsWith('[]')) {
        leaf = leaf.slice(0, -2)

        if (!(leaf in cd)) {
          cd[leaf] = []
        }

        cd[leaf].push(value)
      } else {
        cd[leaf] = value
      }
    }

    return data
  }

  appendContent(element) {
    if (element instanceof Array) {
      return element.map(el => this.appendContent(el))
    }

    return this.dom.body.appendChild(element)
  }

  removeContents() {
    this.dom.body.innerHTML = ''
  }
}

class FilterListPanel extends Panel {
  constructor(filter, isRoot) {
    super()

    this.filter = filter

    if (isRoot) {
      this.dom.element.classList.add('root')
    }

    const onAdd = () => {
      const filter = new Filter()
      filter.name = __`New Filter`
      this.on('apply', () => this.filter.appendChild(filter))
      this.appendFilter(filter)
    }

    const onPaste = () => {
      if (!clipboard.data) {
        return
      }

      const filter = new Filter(clipboard.receive())
      this.on('apply', () => this.filter.appendChild(filter))
      this.appendFilter(filter)
    }

    const { buttons, paste } = $el`
      <div class="fngf-btn-group fngf-row" ref="buttons">
        <button type="button" class="fngf-btn" @click="${onAdd}">${__`Add`}</button>
        <button type="button" class="fngf-btn" @click="${onPaste}" ref="paste" disabled>${__`Paste`}</button>
      </div>
    `

    function pasteState() {
      paste.disabled = !clipboard.data
    }

    clipboard.on('copy', pasteState)
    clipboard.on('purge', pasteState)
    pasteState()

    this.dom.buttons.insertBefore(buttons, this.dom.buttons.firstChild)

    this.on('escape', ::this.close)
    this.on('showing', this.initContents)
    this.on('apply', this)
    this.on('hidden', () => {
      clipboard.off('copy', pasteState)
      clipboard.off('purge', pasteState)
    })
  }

  initContents() {
    const filter = this.filter
    const { name, terms, rules } = $el`
      <div class="fngf-panel-name fngf-row fngf-align-center" ref="name">
        ${__`Rule Name`}&nbsp;
        <input type="text" value="${filter.name}" autocomplete="off" name="name" class="fngf-grow">
      </div>
      <div class="fngf-panel-terms" ref="terms"></div>
      <div class="fngf-panel-rules fngf-column" ref="rules">
        <div class="fngf-panel-rule fngf-row fngf-align-center fngf-only">${__`No Rules`}</div>
      </div>
    `

    const labels = [
      ['title', __`Title`],
      ['url', __`URL`],
      ['sourceTitle', __`Feed Title`],
      ['sourceURL', __`Feed URL`],
      ['author', __`Author`],
      ['keywords', __`Keywords`],
      ['body', __`Contents`],
    ]

    for (const [type, labelText] of labels) {
      const randomId = `id-${Math.random().toFixed(8)}`
      const reg = filter.regexp[type]
      const sourceValue = reg ? reg.source.replace(/((?:^|[^\\])(?:\\\\)*)\\(?=\/)/g, '$1') : ''

      terms.appendChild($el`
        <label for="${randomId}">${labelText}</label>
        <input type="text" class="fngf-panel-terms-textbox" id="${randomId}" autocomplete="off" name="regexp.${type}.source" value="${sourceValue}">
        <label class="fngf-checkbox fngf-row" title="${__`Ignore Case`}">
          <input type="checkbox" name="regexp.${type}.ignoreCase" bool:checked="${reg?.ignoreCase}">
          <span class="fngf-btn" tabindex="0">i</span>
        </label>
      `)
    }

    this.appendContent([name, terms, rules])
    this.dom.rules = rules

    filter.children.forEach(this.appendFilter, this)
  }

  appendFilter(filter) {
    let panel

    const updateRow = () => {
      let title = __`Hit Count:\t${filter.hitcount}`

      if (filter.lasthit) {
        title += '\n'
        title += __`Last Hit:\t${new Date(filter.lasthit).toLocaleString()}`
      }

      rule.title = title
      name.textContent = filter.name
      count.textContent = filter.children.length || ''
    }

    const onEdit = () => {
      if (panel) {
        panel.close()
        return
      }

      panel = new FilterListPanel(filter)
      panel.on('shown', () => btnEdit.classList.add('active'))
      panel.on('hidden', () => {
        btnEdit.classList.remove('active')
        panel = null
      })
      panel.on('apply', () => setTimeout(updateRow, 0))
      panel.open(btnEdit)
    }

    const onCopy = () => clipboard.copy(filter)

    const onDelete = () => {
      document.adoptNode(rule)
      this.on('apply', () => this.filter.removeChild(filter))
    }

    const { rule, name, count, btnEdit } = $el`
      <div class="fngf-panel-rule fngf-row fngf-align-center" ref="rule">
        <div class="fngf-panel-rule-name" @dblclick="${onEdit}" ref="name"></div>
        <div class="fngf-panel-rule-count fngf-badge" ref="count"></div>
        <div class="fngf-panel-rule-actions fngf-btn-group fngf-menu-btn fngf-row" ref="buttons">
          <button type="button" class="fngf-btn" @click="${onEdit}" ref="btnEdit">${__`Edit`}</button>
          <div class="fngf-dropdown fngf-btn" tabindex="0">
            <div class="fngf-dropdown-menu fngf-column">
              <div class="fngf-dropdown-menu-item" @click="${onCopy}">${__`Copy`}</div>
              <div class="fngf-dropdown-menu-item" @click="${onDelete}">${__`Delete`}</div>
            </div>
          </div>
        </div>
      </div>
    `

    updateRow()
    this.dom.rules.appendChild(rule)
  }

  handleEvent(event) {
    if (event.type !== 'apply') {
      return
    }

    const data = this.getFormData(true)
    const filter = this.filter
    const regexp = {}
    let hasError = false

    for (const type in data.regexp) {
      const { source, ignoreCase } = data.regexp[type]

      if (!source.value) {
        continue
      }

      try {
        regexp[type] = new RegExp(source.value, ignoreCase.checked ? 'i' : '')
      } catch (e) {
        if (!(e instanceof SyntaxError)) {
          throw e
        }

        hasError = true
        event.preventDefault()
        source.classList.remove('error')
        source.offsetWidth.valueOf()
        source.classList.add('error')
      }
    }

    if (hasError) {
      return
    }

    const prevSource = Serializer.stringify(filter)

    filter.name = data.name.value
    filter.regexp = regexp

    if (Serializer.stringify(filter) !== prevSource) {
      filter.hitcount = 0
      filter.lasthit = 0
    }

    filter.sortChildren()
  }
}

Preference.defaultPref = Serializer.stringify({
  filter: {
    name: '',
    regexp: {},
    children: [
      {
        name: 'AD',
        regexp: {
          title: /^\W?(?:ADV?|PR)\b/,
        },
        children: [],
      },
    ],
  },
})

evalInContent(() => {
  const XHR = XMLHttpRequest
  let uniqueId = 0

  window.XMLHttpRequest = function XMLHttpRequest() {
    const req = new XHR()

    req.open = open
    req.setRequestHeader = setRequestHeader
    req.addEventListener('readystatechange', onReadyStateChange, false)

    return req
  }

  function open(method, url, ...args) {
    this.__url__ = url

    return this::XHR.prototype.open(method, url, ...args)
  }

  function setRequestHeader(header, value) {
    if (header === 'Authorization') {
      this.__auth__ = value
    }

    return this::XHR.prototype.setRequestHeader(header, value)
  }

  function onReadyStateChange() {
    if (this.readyState < 4 || this.status !== 200) {
      return
    }

    if (!/^(?:https?:)?\/\/(?:cloud\.)?feedly\.com\/v3\/streams\/contents\b/.test(this.__url__)) {
      return
    }

    const pongEventType = 'streamcontentloaded_callback' + uniqueId++

    const data = JSON.stringify({
      type: pongEventType,
      auth: this.__auth__,
      text: this.responseText,
    })

    const event = new MessageEvent('streamcontentloaded', {
      bubbles: true,
      cancelable: false,
      data: data,
      origin: location.href,
      source: null,
    })

    const onPong = ({ data }) => Object.defineProperty(this, 'responseText', { configurable: true, value: data })

    document.addEventListener(pongEventType, onPong, false)
    document.dispatchEvent(event)
    document.removeEventListener(pongEventType, onPong, false)
  }
})

const clipboard = new DataTransfer()
const pref = new Preference()

let rootFilterPanel
let { contextmenu } = $el`
  <menu type="context" id="feedlyng-contextmenu">
    <menu type="context" label="${__`Feedly NG Filter`}" ref="contextmenu"></menu>
  </menu>
`

MenuCommand.contextmenu = contextmenu

pref.on('change', function({ key, newValue }) {
  switch (key) {
    case 'filter':
      if (!(newValue instanceof Filter)) {
        this.set('filter', new Filter(newValue))
      }
      break

    case 'language':
      __.use(newValue)
      break
  }
})

document.addEventListener(
  'streamcontentloaded',
  event => {
    const logging = pref.get('logging', true)
    const filter = pref.get('filter')
    const filteredEntryIds = []
    const { type: pongEventType, auth, text } = JSON.parse(event.data)
    const data = JSON.parse(text)
    let hasUnread = false

    data.items = data.items.filter(item => {
      const entry = new Entry(item)

      if (!filter.test(entry)) {
        return true
      }

      if (logging) {
        GM_log(`filtered: "${entry.title || ''}" ${entry.url}`)
      }

      filteredEntryIds.push(entry.id)

      if (entry.unread) {
        hasUnread = true
      }

      return false
    })

    if (!filteredEntryIds.length) {
      return
    }

    let ev = new MessageEvent(pongEventType, {
      bubbles: true,
      cancelable: false,
      data: JSON.stringify(data),
      origin: location.href,
      source: unsafeWindow,
    })

    document.dispatchEvent(ev)

    if (!hasUnread) {
      return
    }

    sendJSON({
      url: '/v3/markers',
      headers: {
        Authorization: auth,
      },
      data: {
        action: 'markAsRead',
        entryIds: filteredEntryIds,
        type: 'entries',
      },
    })
  },
  false,
)

document.addEventListener(
  'DOMContentLoaded',
  () => {
    GM_addStyle(CSS_STYLE_TEXT)

    pref.load()
    pref.autosave()

    registerMenuCommands()
    addSettingsMenuItem()
  },
  false,
)

document.addEventListener(
  'mousedown',
  ({ target }) => {
    if (target.matches('.fngf-dropdown')) {
      target.classList.toggle('active')
    }

    if (!target.closest('.fngf-dropdown')) {
      document.querySelector('.fngf-dropdown.active')?.classList.remove('active')
    }
  },
  true,
)

document.addEventListener(
  'click',
  ({ target }) => {
    if (target.closest('.fngf-dropdown-menu-item')) {
      target.closest('.fngf-dropdown')?.classList.remove('active')
    }
  },
  true,
)

function $el(strings, ...values) {
  let html = ''

  if (typeof strings === 'string') {
    html = strings
  } else {
    values.forEach((v, i) => {
      html += strings[i]

      if (v === null || v === undefined) {
        return
      }

      if (v instanceof Node || v instanceof NodeList || v instanceof HTMLCollection || v instanceof Array) {
        html += `<!--${$el.dataPrefix}${i}-->`

        if (v instanceof Node) {
          return
        }

        values[i] = document.createDocumentFragment()
        for (const item of v) {
          values[i].appendChild(item)
        }

        return
      }

      html += v instanceof Object ? i : v
    })

    html += strings[strings.length - 1]
  }

  const renderer = document.createElement('template')
  const container = document.createElement('body')
  const refs = document.createDocumentFragment()

  renderer.innerHTML = html
  container.appendChild(renderer.content)

  refs.first = container.firstElementChild
  refs.last = container.lastElementChild

  const exp = `
    .//*[@ref or @*[starts-with(name(), "@") or contains(name(), ":")]] |
    .//comment()[starts-with(., "${$el.dataPrefix}")]
  `
  const xpath = document.evaluate(exp, container, null, 7, null)

  for (let i = 0; i < xpath.snapshotLength; i++) {
    const el = xpath.snapshotItem(i)

    if (el.nodeType === document.COMMENT_NODE) {
      const index = el.data.substring($el.dataPrefix.length)
      el.parentNode.replaceChild(values[index], el)
      continue
    }

    for (const { name, value } of Array.from(el.attributes)) {
      const data = values[value]

      if (name === 'ref') {
        refs[value] = el
      } else if (name.startsWith('@')) {
        $el.func(el, name.substring(1), data)
      } else if (name === ':class') {
        for (const k of Object.keys(data)) {
          el.classList.toggle(k, data[k])
        }
      } else if (name.startsWith('bool:')) {
        el[name.substring(5)] = data
      } else {
        continue
      }

      el.removeAttribute(name)
    }
  }

  Array.from(container.childNodes).forEach(node => refs.appendChild(node))

  return refs
}

$el.dataPrefix = '$el.data:'
$el.func = (el, type, fn) => {
  if (type) {
    el.addEventListener(type, fn, false)
  } else {
    try {
      fn.call(el, el)
    } catch (e) {
      console.error(e)
    }
  }
}

function xhr(details) {
  const opt = { ...details }
  const { data } = opt
  opt.method ||= data ? 'POST' : 'GET'

  if (data instanceof Object) {
    opt.headers ||= {}
    opt.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    opt.data = Object.entries(data)
      .map(kv => kv.map(encodeURIComponent).join('='))
      .join('&')
  }

  setTimeout(() => GM_xmlhttpRequest(opt), 0)
}

function registerMenuCommands() {
  MenuCommand.register(`${__`Setting`}...`, togglePrefPanel)
  MenuCommand.register(`${__`Language`}...`, () => {
    const { langField, select } = $el(`
      <fieldset ref="langField">
        <legend>${__`Language`}</legend>
        <select ref="select"></select>
      </fieldset>
    `)

    __.languages.forEach(lang => {
      const option = $el(`<option value="${lang}">${lang}</option>`).first

      if (lang === __.config.locale) {
        option.selected = true
      }

      select.appendChild(option)
    })

    const panel = new Panel()
    panel.appendContent(langField)
    panel.on('apply', () => pref.set('language', select.value))
    panel.open()
  })

  MenuCommand.register(`${__`Import Configuration`}...`, ::pref.importFromFile)
  MenuCommand.register(__`Export Configuration`, ::pref.exportToFile)
}

function sendJSON(details) {
  const opt = { ...details }
  const { data } = opt

  opt.headers ||= {}
  opt.method = 'POST'
  opt.headers['Content-Type'] = 'application/json; charset=utf-8'
  opt.data = JSON.stringify(data)

  return xhr(opt)
}

function evalInContent(code) {
  const script = document.createElement('script')
  script.textContent = typeof code === 'function' ? `(${code})()` : code
  document.documentElement.appendChild(script)
  document.adoptNode(script)
}

function togglePrefPanel(anchorElement) {
  if (rootFilterPanel) {
    rootFilterPanel.close()
    return
  }

  rootFilterPanel = new FilterListPanel(pref.get('filter'), true)
  rootFilterPanel.on('apply', () => notify(__`NG Settings were modified.\nNew filters take effect after next refresh.`))
  rootFilterPanel.on('hidden', () => {
    clipboard.purge()
    rootFilterPanel = null
  })
  rootFilterPanel.open(anchorElement)
}

function onNGSettingCommand({ target }) {
  togglePrefPanel(target)
}

function addSettingsMenuItem() {
  if (!document.getElementById('filtertab')) {
    setTimeout(addSettingsMenuItem, 100)
    return
  }

  let prefListener

  function onMutation() {
    if (document.getElementById('feedly-ng-filter-setting')) {
      return
    }

    const nativeFilterItem = document.getElementById('filtertab')
    if (!nativeFilterItem) {
      return
    }

    if (prefListener) {
      pref.off('change', prefListener)
    }

    const { tab, label } = $el`
      <div class="tab" contextmenu="${MenuCommand.contextmenu.parentNode.id}" @click="${onNGSettingCommand}" ref="tab">
        <div class="header target">
          <img class="icon" src="${GM_info.script.icon}" style="cursor: pointer;">
          <div class="label nonEmpty" id="feedly-ng-filter-setting" ref="label"></div>
        </div>
      </div>
    `

    label.textContent = __`NG Setting`

    nativeFilterItem.parentNode.insertBefore(tab, nativeFilterItem.nextSibling)
    document.body.appendChild(contextmenu.parentNode)

    prefListener = ({ key }) => {
      if (key === 'language') {
        label.textContent = __`NG Setting`
      }
    }

    pref.on('change', prefListener)
  }

  new MutationObserver(onMutation).observe(document.getElementById('feedlyTabs'), {
    childList: true,
    subtree: true,
  })

  onMutation()
}

async function openFilePicker(multiple) {
  return new Promise(resolve => {
    const input = $el`<input type="file" @change="${() => input.files |> Array.from |> resolve}">`.first
    input.multiple = multiple
    input.click()
  })
}

async function notify(body, options) {
  options = { body, ...notificationDefaults, ...options }

  return new Promise((resolve, reject) => {
    Notification.requestPermission(status => {
      if (status !== 'granted') {
        reject(status)
        return
      }

      const n = new Notification(options.title, options)

      if (options.autoClose) {
        setTimeout(::n.close, options.autoClose)
      }

      resolve(n)
    })
  })
}
