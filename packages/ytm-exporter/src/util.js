export async function getAll(urls, progress) {
  return Promise.all(
    urls.map(async url => {
      const res = await $.get(url)
      progress()
      return res
    }),
  )
}

export async function waitAll(promises, progress) {
  return promises.map(p => p.then(tap(progress))) |> Promise.all
}

export function tap(fn) {
  return function(arg) {
    fn(arg)
    return arg
  }
}

export function arrayToMapByItemId(arr) {
  const res = {}
  arr.forEach(item => {
    res[item.id] = item
  })
  return res
}
