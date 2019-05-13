import { getPages, getTags, getScripts } from '../api'
import { saveAsCsv } from '../csv'
import { ProgressModal } from '../modal'
import { waitAll, arrayToMapByItemId } from '../util'

const itemProps = [
  'id',
  'order',
  'name',
  'description',
  'url',
  'scriptContents',
  'tagIds',
  'tagNames',
  'pageIds',
  'pageNames',
]
const header = [
  'ID',
  '実行順序',
  '名前',
  '説明',
  'URL',
  'コード',
  '依存タグ ID',
  '依存タグ名',
  '依存ページ ID',
  '依存ページ名',
]

async function exportScript() {
  const resources = [getPages(), getTags(), getScripts()]
  const modal = ProgressModal.open({ maxValue: resources.length })
  const [pages, tags, scripts] = await waitAll(resources, () => modal.increment())
  const pageById = arrayToMapByItemId(pages)
  const tagById = arrayToMapByItemId(tags)
  const rows = scripts.map(item => {
    item.tagIds = item.tagsId.join('\n')
    item.pageIds = item.pagesId.join('\n')
    item.tagNames = item.tagsId.map(id => tagById[id].name).join('\n')
    item.pageNames = item.pagesId.map(id => pageById[id].name).join('\n')
    return [...itemProps.map(k => item[k])]
  })
  rows.unshift(header)
  saveAsCsv(rows, 'スクリプト一覧')
}

export function registerScriptExporter() {
  GM_registerMenuCommand('スクリプトをエクスポート', exportScript)
}
