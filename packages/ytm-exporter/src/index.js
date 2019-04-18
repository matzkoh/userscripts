{
  // ==UserScript==
  // @name         YTM Exporter
  // @namespace    https://github.com/matzkoh
  // @version      1.1.0
  // @description  Export to excel for YTM console
  // @author       matzkoh
  // @include      https://control.theyjtag.jp/sites/*/tags
  // @include      https://control.theyjtag.jp/sites/*/pages/*/tag-assignments
  // @grant        GM_registerMenuCommand
  // ==/UserScript==
}

/* global $:false */

import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import LocalizedFormat from 'dayjs/esm/plugin/localizedFormat'

dayjs.locale('ja')
dayjs.extend(LocalizedFormat)

const tagProps = [
  'id',
  'status',
  'name',
  'vendorName',
  'createdAt',
  'modifiedAt',
  'tag',
  'catalog',
  'conditionalFiring',
]
const csvHeaders = [
  'ID',
  'ステータス',
  'タグ名',
  'サービス提供元',
  '作成日',
  '更新日',
  'カスタムタグ',
  'カタログタグ',
  'タグ実行条件',
  '実行ページ',
]

GM_registerMenuCommand('タグをエクスポート', async () => {
  const urls = Array.from($('.row-selected .tag-detail-link')).map(a => [
    new URL('attributes', a.href),
    new URL('page-assignments', a.href),
  ])
  const totalCount = urls.length
  if (!totalCount) {
    AlertModal.open({ message: 'エクスポートするタグを選択してください' })
    return
  }

  const modal = ProgressModal.open({ maxValue: totalCount * 2 })
  const rows = await Promise.all(
    urls.map(async urls => {
      const [{ tag }, page] = await getAll(urls, () => modal.increment())
      const urlPatterns = page[0]?.urlPatterns?.includes?.map(item => item.pattern) || []
      return tagDetailToRow({ tag, urlPatterns })
    }),
  )

  rows.unshift(csvHeaders)
  console.log(rows)

  const date = dayjs().format('YYYYMMDD')
  const site = $('#currentSite')
    .text()
    .trim()

  const blob = createExcelCsvBlob(rows)
  const fileName = `[${date}] [${site}] サービスタグ.csv`

  saveBlob(blob, fileName)
})

async function getAll(urls, progress) {
  return Promise.all(
    urls.map(async url => {
      const res = await $.get(url)
      progress()
      return res
    }),
  )
}

async function tagDetailToRow({ tag, urlPatterns }) {
  tag.status = { ACTIVE: '有効', INACTIVE: '無効' }[tag.status] || tag.status
  tag.createdAt = dayjs(tag.createdAt).format('llll')
  tag.modifiedAt = dayjs(tag.modifiedAt).format('llll')

  const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})
  if (tag.defaultTagCategoryName === 'Functional') {
    tag.tag = fields.markup
  } else {
    tag.catalog = JSON.stringify(fields)
  }
  const pageUrl = urlPatterns.join('\n')
  return [...tagProps.map(k => tag[k]), pageUrl]
}

function saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob)

  $('<a/>')
    .attr('download', fileName)
    .prop('href', url)
    .appendTo('body')
    .each((_, a) => a.click())
    .remove()

  URL.revokeObjectURL(url)
}

function createExcelCsvBlob(rows) {
  const value = csvStringify(rows)
  const bom = new Uint8Array([0xef, 0xbb, 0xbf])
  return new Blob([bom, value], { type: 'text/csv' })
}

function csvStringify(rows) {
  return rows.map(cells => cells.map(quoteForCsv).join(',')).join('\r\n')
}

function quoteForCsv(value) {
  return `"${String(value ?? '').replace(/"/g, '""')}"`
}

class Modal {
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

class AlertModal extends Modal {
  constructor(options) {
    super({ ...options, closeOnClick: true })
    this.body.text(this.options.message).css({
      fontSize: '2vw',
    })
  }
}

class ProgressModal extends Modal {
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
