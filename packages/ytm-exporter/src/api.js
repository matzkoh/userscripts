const baseUrl = location.pathname
  .split('/')
  .slice(0, 3)
  .join('/')

export async function getPages() {
  return $.get(`${baseUrl}/pages-json`)
}

export async function getTags() {
  return $.get(`${baseUrl}/tags`)
}

export async function getScripts() {
  return $.get(`${baseUrl}/libraries-json`)
}

export async function getTagAttributes(id) {
  return (await $.get(`${baseUrl}/tags/${id}/attributes`)).tag
}

export async function getTagPageAssignments(id) {
  return $.get(`${baseUrl}/tags/${id}/page-assignments`)
}

export async function getDataList() {
  return $.get(`${baseUrl}/data`)
}

export async function getDataInputs(id) {
  const html = await $.get(`${baseUrl}/data/${id}/inputs`)
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return Array.from(doc.querySelectorAll('.view-data > tbody > tr')).map(tr => ({
    pageId: tr.cells[0].querySelector('a')?.href.match(/(?<=\/)\d+(?=\/)/)?.[0],
    pageName: tr.cells[0].textContent.trim(),
    dbe: tr.cells[2].textContent.trim(),
  }))
}
