// ==UserScript==
// @name         niconizer-tweetdeck
// @namespace    https://github.com/matzkoh
// @version      1.0.0
// @description  Twitter の新着ツイートを niconizer へ連携します
// @author       matzkoh
// @include      https://tweetdeck.twitter.com/
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @noframes
// ==/UserScript==

GM_registerMenuCommand(`[niconizer]: Set server URL`, () => {
  const currentValue = GM_getValue('wsUrl', 'ws://localhost:25252/')
  const value = prompt('Set server URL', currentValue)
  if (value && value !== currentValue) {
    GM_setValue('wsUrl', value)
    location.reload()
  }
})

const ws = new Promise(resolve => {
  const wsUrl = GM_getValue('wsUrl', 'ws://localhost:25252/')
  const ws = new WebSocket(wsUrl)
  ws.addEventListener('open', () => resolve(ws))
})

async function sendComment(comment) {
  console.debug(comment)
  ;(await ws).send(comment)
}

document.addEventListener('click', event => {
  const icon = event.target.closest('.niconizer-toggle-icon')
  if (!icon) {
    return
  }

  const isActive = icon.classList.toggle('icon-toggle-on')
  icon.classList.toggle('icon-toggle-off')

  event.target.closest('.column')?.classList.toggle('niconizer-watching', isActive)
})

new MutationObserver(mutations => {
  const addedElements = mutations.flatMap(m => Array.from(m.addedNodes)).filter(n => n.nodeType === Node.ELEMENT_NODE)

  addedElements
    .filter(el => el.matches('.column:not(.js-simple-column)'))
    .filter(el => el.querySelector('.column-header-links'))
    .filter(el => !el.querySelector('.niconizer-toggle-icon'))
    .forEach(appendToggleIcon)

  addedElements
    .filter(el => el.matches('.column-header, .column-header-links'))
    .filter(el => !el.querySelector('.niconizer-toggle-icon'))
    .map(el => el.closest('.column:not(.js-simple-column)'))
    .filter(Boolean)
    .forEach(appendToggleIcon)

  addedElements
    .filter(el => el.matches('.stream-item'))
    .filter(el => el.closest('.column.niconizer-watching'))
    .map(getCommentBodyFromTweet)
    .filter(Boolean)
    .forEach(sendComment)
}).observe(document.body, { childList: true, subtree: true })

function appendToggleIcon(column) {
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

function getCommentBodyFromTweet(el) {
  const isRetweet = el.querySelector('.tweet-context')
  if (isRetweet) {
    return null
  }

  const textEl = el.querySelector('.tweet-text')
  if (!textEl) {
    return null
  }

  let text = textEl.textContent

  el.closest('.column')
    ?.querySelector('.column-title-edit-box')
    ?.value.match(/#[^\s()]+/g)
    ?.forEach(hashTag => {
      text = text.split(hashTag).join('')
    })

  return text.trim().replace(/\s+/g, ' ')
}
