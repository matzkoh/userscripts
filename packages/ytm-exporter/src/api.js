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
