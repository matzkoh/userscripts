// ==UserScript==
// @name         esa on Google
// @namespace    https://github.com/matzkoh
// @version      1.1.0
// @description  show esa search result on google search
// @author       matzkoh
// @include      https://www.google.tld/search?*
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @connect      api.esa.io
// ==/UserScript==

import { main } from './main.mjs'

const queryString = new URL(location).searchParams.get('q')

if (queryString) {
  main(queryString)
}
