export async function getAll(urls, progress) {
  return Promise.all(
    urls.map(async url => {
      const res = await $.get(url)
      progress()
      return res
    }),
  )
}
