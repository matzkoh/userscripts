// ==UserScript==
// @name         niconizer-tweetdeck
// @namespace    https://github.com/matzkoh
// @version      1.1.0
// @description  Twitter の新着ツイートを niconizer へ連携します
// @author       matzkoh
// @include      https://tweetdeck.twitter.com/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

;(function() {
  // ASSET: index.js
  GM_registerMenuCommand(`[niconizer]: Set server URL`, () => {
    const currentValue = GM_getValue('wsUrl', 'ws://localhost:25252/')
    const value = prompt('Set server URL', currentValue)

    if (value && value !== currentValue) {
      GM_setValue('wsUrl', value)
      location.reload()
    }
  })
  const $Focm$var$ws = new Promise(resolve => {
    const wsUrl = GM_getValue('wsUrl', 'ws://localhost:25252/')
    const ws = new WebSocket(wsUrl)
    ws.addEventListener('open', () => resolve(ws))
  })

  function $Focm$var$escapeHtml(str) {
    const el = document.createElement('div')
    el.textContent = str
    return el.innerHTML
  }

  async function $Focm$var$sendComment(comment) {
    var _escapeHtml

    console.log(comment)
    ;(_escapeHtml = $Focm$var$escapeHtml(comment)), (await $Focm$var$ws).send(_escapeHtml)
  }

  document.addEventListener('click', event => {
    var _event$target$closest

    const icon = event.target.closest('.niconizer-toggle-icon')

    if (!icon) {
      return
    }

    const isActive = icon.classList.toggle('icon-toggle-on')
    icon.classList.toggle('icon-toggle-off')
    ;(_event$target$closest = event.target.closest('.column')) === null || _event$target$closest === void 0
      ? void 0
      : _event$target$closest.classList.toggle('niconizer-watching', isActive)
  })
  new MutationObserver(mutations => {
    const addedElements = mutations.flatMap(m => Array.from(m.addedNodes)).filter(n => n.nodeType === Node.ELEMENT_NODE)
    addedElements
      .filter(el => el.matches('.column:not(.js-simple-column)'))
      .filter(el => el.querySelector('.column-header-links'))
      .filter(el => !el.querySelector('.niconizer-toggle-icon'))
      .forEach($Focm$var$appendToggleIcon)
    addedElements
      .filter(el => el.matches('.column-header, .column-header-links'))
      .filter(el => !el.querySelector('.niconizer-toggle-icon'))
      .map(el => el.closest('.column:not(.js-simple-column)'))
      .filter(Boolean)
      .forEach($Focm$var$appendToggleIcon)
    addedElements
      .filter(el => el.matches('.stream-item'))
      .filter(el => el.closest('.column.niconizer-watching'))
      .map($Focm$var$getCommentBodyFromTweet)
      .filter(Boolean)
      .forEach($Focm$var$sendComment)
  }).observe(document.body, {
    childList: true,
    subtree: true,
  })

  function $Focm$var$appendToggleIcon(column) {
    const buttonContainer = column.querySelector('.column-header-links')
    const btn = document.createElement('span')
    btn.className = 'column-header-link'
    btn.innerHTML =
      '<i class="niconizer-toggle-icon icon js-show-tip is-actionable" data-tooltip-position="bottom" title="niconizer 連携"></i>'
    const isActive = column.classList.contains('niconizer-watching')
    const icon = btn.firstElementChild
    icon.classList.toggle('icon-toggle-on', isActive)
    icon.classList.toggle('icon-toggle-off', !isActive)
    buttonContainer.insertBefore(btn, buttonContainer.firstElementChild)
  }

  function $Focm$var$getCommentBodyFromTweet(el) {
    var _el$closest, _el$closest$querySele, _el$closest$querySele2

    const isRetweet = el.querySelector('.tweet-context')

    if (isRetweet) {
      return null
    }

    const textEl = el.querySelector('.tweet-text')

    if (!textEl) {
      return null
    }

    let text = textEl.textContent
    ;(_el$closest = el.closest('.column')) === null || _el$closest === void 0
      ? void 0
      : (_el$closest$querySele = _el$closest.querySelector('.column-title-edit-box')) === null ||
        _el$closest$querySele === void 0
      ? void 0
      : (_el$closest$querySele2 = _el$closest$querySele.value.match(/#[^\s()]+/g)) === null ||
        _el$closest$querySele2 === void 0
      ? void 0
      : _el$closest$querySele2.forEach(hashTag => {
          text = text.split(hashTag).join('')
        })
    return text.trim().replace(/\s+/g, ' ')
  }
})()
