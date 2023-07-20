// ==UserScript==
// @name         Add CircleCI Workflows Link
// @namespace    https://github.com/matzkoh
// @version      1.0.2
// @description  現在のブランチにおける CircleCI Workflows ページへのリンクを追加する
// @author       matzkoh
// @match        https://github.com/*/*/pull/*
// ==/UserScript==

import { main } from './main.mjs'

const rules = [
  {
    // プルリク
    match: /([^/]+)\/(([^/]+))\/pull\//,

    getUserName(matches) {
      return matches[1]
    },

    getRepoName(matches) {
      return matches[2]
    },

    getBranchName() {
      return document.querySelector('clipboard-copy[value]').value
    },

    insertButton(btn) {
      const sidebar = document.getElementById('partial-discussion-sidebar')
      const sidebarItem = document.createElement('div')
      sidebarItem.className = 'discussion-sidebar-item'
      const header = document.createElement('div')
      header.className = 'discussion-sidebar-heading text-bold'
      header.textContent = 'CircleCI'
      sidebarItem.appendChild(header)
      btn.classList.add('text-inherit')
      btn.classList.add('text-bold')
      btn.textContent = 'Workflows'
      sidebarItem.appendChild(btn)
      sidebar.insertBefore(sidebarItem, sidebar.firstChild)
    },
  },
]

const { pathname: path } = location
const rule = rules.find(({ match }) => match.test(path))

if (rule) {
  main(path, rule)
}
