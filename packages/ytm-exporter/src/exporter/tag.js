import dayjs from '../dayjs'
import { AlertModal, ProgressModal } from '../modal'
import { getAll } from '../util'
import { saveAsCsv } from '../csv'

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
const csvHeader = [
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

async function exportTag() {
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
  rows.unshift(csvHeader)

  saveAsCsv(rows, 'サービスタグ')
}

export function registerTagExporter() {
  GM_registerMenuCommand('タグをエクスポート', exportTag)
}
