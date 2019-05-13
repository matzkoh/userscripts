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
