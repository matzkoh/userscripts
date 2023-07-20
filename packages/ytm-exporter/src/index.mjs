// ==UserScript==
// @name         YTM Exporter
// @namespace    https://github.com/matzkoh
// @version      1.4.1
// @description  Export to excel for YTM console
// @author       matzkoh
// @include      https://control.theyjtag.jp/sites/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

import { registerDataExporter } from './exporter/data.mjs'
import { registerPageExporter } from './exporter/page.mjs'
import { registerScriptExporter } from './exporter/script.mjs'
import { registerTagExporter } from './exporter/tag.mjs'

// https://control.theyjtag.jp/sites/*/tags
// https://control.theyjtag.jp/sites/*/pages/*/tag-assignments
if (/^\/sites\/[^/]+\/(?:tags|pages\/[^/]+\/tag-assignments)$/.test(location.pathname)) {
  registerTagExporter()
}

registerDataExporter()
registerPageExporter()
registerScriptExporter()
