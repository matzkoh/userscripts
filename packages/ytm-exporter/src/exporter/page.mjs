import dayjs from '../dayjs.mjs'
import { getPages } from '../api.mjs'
import { saveAsCsv } from '../csv.mjs'
import { ProgressModal } from '../modal'
import { convertPatterns, waitAll } from '../util'

const columns = [
  ['id', 'ID'],
  ['name', '名前'],
  ['includes', '対象 URL パターン'],
  ['excludes', '対象外 URL パターン'],
  ['caseInsensitiveUrls', 'URL の大文字/小文字を区別'],
  ['archived', '削除済'],
  ['createdAt', '作成日'],
  ['modifiedAt', '更新日'],
]

async function exportPage() {
  const resources = [getPages()]
  const modal = ProgressModal.open({ maxValue: resources.length })
  const [pages] = await waitAll(resources, () => modal.increment())
  const rows = pages.map(item => {
    const { includes, excludes } = convertPatterns(item.urlPatterns)
    item.includes = includes
    item.excludes = excludes
    item.createdAt = dayjs(item.createdAt).format('llll')
    item.modifiedAt = dayjs(item.modifiedAt).format('llll')
    return [...columns.map(column => item[column[0]])]
  })
  const header = columns.map(c => c[1])
  rows.unshift(header)
  saveAsCsv(rows, 'ページ一覧')
}

export function registerPageExporter() {
  GM_registerMenuCommand('ページをエクスポート', exportPage)
}
