import dayjs from '../dayjs.mjs'
import { getDataList, getDataInputs } from '../api.mjs'
import { saveAsCsv } from '../csv.mjs'
import { ProgressModal } from '../modal'

const columns = [
  ['id', 'ID'],
  ['name', '名前'],
  ['pageId', 'ページ ID'],
  ['pageName', 'ページ名'],
  ['dbe', 'データバインディングエクスプレッション'],
  ['createdAt', '作成日'],
  ['modifiedAt', '更新日'],
]

async function exportData() {
  const items = await getDataList()
  const modal = ProgressModal.open({ maxValue: items.length })
  const itemsWithInputs = await Promise.all(
    items.map(async item => {
      const inputs = await getDataInputs(item.id)
      modal.increment()
      return { item, inputs }
    }),
  )
  const rows = itemsWithInputs.flatMap(({ item, inputs }) => {
    item.createdAt = dayjs(item.createdAt).format('llll')
    item.modifiedAt = dayjs(item.modifiedAt).format('llll')
    return inputs.map(input => [...columns.map(([key]) => input[key] || item[key])])
  })
  const header = columns.map(c => c[1])
  rows.unshift(header)
  saveAsCsv(rows, 'カスタムデータエレメント一覧')
}

export function registerDataExporter() {
  GM_registerMenuCommand('カスタムデータエレメントをエクスポート', exportData)
}
