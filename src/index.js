export const rAll = fn => arr => Promise.all(arr.map(item => fn(item).then(procItem => {
  return procItem
}).catch(error => {
  return {error}
})))

export const rDelaySeq = (fn, arr, n) => rSeq(i => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(fn(i))
  }, n)
}), arr)

export const rSubSeq = (fn, set, l) =>
  rSeq(rAll(fn), subsets(set, l)).then(result =>
    Promise.resolve(result.reduce((fa, sa) => fa.concat(sa), [])))

export const rSeq = (fn, set) => new Promise((resolve, reject) => {
  let result = []
  set.map(item => () => fn(item)).reduce((curr, next) => {
    return curr.then(res => {
      if (res) result.push(res)
      return next()
    }).catch(error => {
      result.push({error})
    })
  }, Promise.resolve()).then(res => {
    if (res) result.push(res)
    resolve(result)
  }).catch(error => {
    result.push({error})
    resolve(result)
  })
})

const subsets = (original, subsetSize) => {
  let a = []
  for (let i = 0; i < original.length; i += subsetSize) {
    const untilIndex = i + subsetSize
    a.push(original.slice(i, untilIndex))
  }
  return a
}
