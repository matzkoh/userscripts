export async function waitAll(promises, progress) {
  return promises.map(p => p.then(tap(progress))) |> Promise.all
}

export function unique(arr) {
  return arr.filter((value, i) => arr.indexOf(value) === i)
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

export function convertPatterns(urlPatterns) {
  return {
    includes: urlPatterns?.includes?.map(item => item.pattern ?? '(不明なデータ)') ?? [],
    excludes: urlPatterns?.excludes?.map(item => item.pattern ?? '(不明なデータ)') ?? [],
  }
}
