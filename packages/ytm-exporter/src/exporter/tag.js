import dayjs from '../dayjs'
import { getTagAttributes, getTagPageAssignments } from '../api'
import { saveAsCsv } from '../csv'
import { AlertModal, ProgressModal } from '../modal'
import { convertPatterns, unique, waitAll } from '../util'

const columns = [
  ['id', 'ID'],
  ['status', 'ステータス'],
  ['name', 'タグ名'],
  ['vendorName', 'サービス提供元'],
  ['tag', 'カスタムタグ'],
  ['catalog', 'カタログタグ'],
  ['conditionalFiring', 'タグ実行条件'],
  ['pageIds', '実行ページ ID'],
  ['pageNames', '実行ページ名'],
  ['includes', '対象 URL パターン'],
  ['excludes', '対象外 URL パターン'],
  ['createdAt', '作成日'],
  ['modifiedAt', '更新日'],
]

async function exportTag() {
  const tagIds = Array.from($('.row-selected')).map(el => el.dataset.tagId)
  if (tagIds.findIndex(id => !id) !== -1) {
    throw new Error('不正な選択アイテムがあります')
  }
  if (!tagIds.length) {
    AlertModal.open({ message: 'エクスポートするタグを選択してください' })
    return
  }

  const modal = ProgressModal.open({ maxValue: tagIds.length * 2 })
  const rows = await Promise.all(
    tagIds.map(async id => {
      const [tag, pages] = await waitAll([getTagAttributes(id), getTagPageAssignments(id)], () => modal.increment())
      tag.pageIds = pages.map(p => p.id)
      tag.pageNames = pages.map(p => p.name)
      const patterns = pages.map(p => convertPatterns(p.urlPatterns))
      tag.includes = patterns.flatMap(item => item.includes).sort() |> unique
      tag.excludes = patterns.flatMap(item => item.excludes).sort() |> unique
      const fields = tag.fields.reduce((o, p) => ((o[p.key] = p.value), o), {})
      if (tag.defaultTagCategoryName === 'Functional') {
        tag.tag = fields.markup
      } else {
        tag.catalog = fields
      }
      tag.status = { ACTIVE: '有効', INACTIVE: '無効' }[tag.status] || tag.status
      tag.createdAt = dayjs(tag.createdAt).format('llll')
      tag.modifiedAt = dayjs(tag.modifiedAt).format('llll')
      return [...columns.map(column => tag[column[0]])]
    }),
  )
  const header = columns.map(c => c[1])
  rows.unshift(header)
  saveAsCsv(rows, 'サービスタグ')
}

export function registerTagExporter() {
  GM_registerMenuCommand('タグをエクスポート', exportTag)
}
