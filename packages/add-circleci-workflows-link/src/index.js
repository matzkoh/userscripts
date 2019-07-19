// ==UserScript==
// @name         Add CircleCI Workflows Link
// @namespace    https://github.com/matzkoh
// @version      1.0.1
// @description  現在のブランチにおける CircleCI Workflows ページへのリンクを追加する
// @author       matzkoh
// @include      https://github.com/*
// ==/UserScript==

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
      return document.querySelector('.merge-pr-more-commits a').textContent
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

if (!rule) {
  return
}

const matches = path.match(rule.match)
const userName = rule.getUserName(matches)
const repoName = rule.getRepoName(matches)
const branchName = rule.getBranchName(matches)

const btn = document.createElement('a')
btn.textContent = 'CircleCI Workflows'
btn.href = `https://circleci.com/gh/${userName}/workflows/${repoName}/tree/${branchName}`
btn.target = '_blank'
btn.style.display = 'inline-block'
btn.style.height = '20px'
btn.style.lineHeight = '20px'
btn.style.paddingLeft = '20px'
btn.style.background = 'url("https://avatars0.githubusercontent.com/ml/7?s=16") left center no-repeat'

rule.insertButton(btn)
