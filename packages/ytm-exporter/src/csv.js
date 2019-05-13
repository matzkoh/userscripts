import dayjs from './dayjs'

export function saveAsCsv(rows, name) {
  const blob = createExcelCsvBlob(rows)
  const date = dayjs().format('YYYYMMDD')
  const site = $('#currentSite')
    .text()
    .trim()

  saveBlob(blob, `[${date}] [${site}] ${name}.csv`)
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
