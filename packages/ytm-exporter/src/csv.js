export function saveAsCsv(rows, fileName) {
  const blob = createExcelCsvBlob(rows)
  saveBlob(blob, fileName)
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
