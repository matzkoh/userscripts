{
  // ==UserScript==
  // @name         YTM Exporter
  // @namespace    https://github.com/matzkoh
  // @version      1.4.0
  // @description  Export to excel for YTM console
  // @author       matzkoh
  // @include      https://control.theyjtag.jp/sites/*
  // @grant        GM_registerMenuCommand
  // ==/UserScript==
}

import { registerDataExporter } from './exporter/data'
import { registerPageExporter } from './exporter/page'
import { registerScriptExporter } from './exporter/script'
import { registerTagExporter } from './exporter/tag'

// https://control.theyjtag.jp/sites/*/tags
// https://control.theyjtag.jp/sites/*/pages/*/tag-assignments
if (/^\/sites\/[^/]+\/(?:tags|pages\/[^/]+\/tag-assignments)$/.test(location.pathname)) {
  registerTagExporter()
}

registerDataExporter()
registerPageExporter()
registerScriptExporter()
