{
  // ==UserScript==
  // @name         YTM Exporter
  // @namespace    https://github.com/matzkoh
  // @version      1.1.1
  // @description  Export to excel for YTM console
  // @author       matzkoh
  // @include      https://control.theyjtag.jp/sites/*
  // @grant        GM_registerMenuCommand
  // ==/UserScript==
}

import { registerTagExporter } from './exporter/tag'

// https://control.theyjtag.jp/sites/*/tags
// https://control.theyjtag.jp/sites/*/pages/*/tag-assignments
if (/^\/sites\/[^/]+\/(?:tags|pages\/[^/]+\/tag-assignments)$/.test(location.pathname)) {
  registerTagExporter()
}
