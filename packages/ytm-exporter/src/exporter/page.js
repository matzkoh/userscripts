import dayjs from '../dayjs'
import { getPages } from '../api'
import { saveAsCsv } from '../csv'
import { ProgressModal } from '../modal'
import { waitAll } from '../util'

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
    item.includes = item.urlPatterns?.includes?.map(o => o.pattern ?? '').join('\n')
    item.excludes = item.urlPatterns?.excludes?.map(o => o.pattern ?? '').join('\n')
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
