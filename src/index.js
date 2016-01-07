export function rAll(arr, fn){
  return new Promise((resolve, reject) => {
    return arr.map(item => ()=> fn(item)).forEach(proc => {
      return resolve(proc());
    });
  });
}

export function rES(set, fn, n, i = 0){
  return new Promise((resolve,reject) => {
    let checker = checkRESArgs(set, fn, n, i);
    if (checker.error)
      return reject(checker.error);
    i >= set.length ? resolve() : setTimeout(() => {
      fn(set[i]).then(result => {
        if (result)
          console.log(result);
        return rES(set, fn, n, i+1);
      }).then(result => {
        resolve(result);
      }).catch(err =>{
        if (err)
          console.log(err);
        resolve(rES(set, fn, n, i+1));
      });
    },Math.floor(1000/n));
  });
}

/*
export function rLimit(set, fn, l, i = 0){
  return new Promise ((resolve, reject) => {
    let checker = checkRLimitArgs(set, fn, l, i);
    if (checker.error)
      return reject(checker.error);
    i >= subsets(set,l).length ?
      resolve() : rAll(subsets(set,l)[i], fn).then(()=>{
      return rLimit(set, fn, l, i+1);
    }).then(()=> {
      resolve();
    }).catch(err => {
      if(err)
        console.log(err);
      resolve(rLimit(set, fn, l, i+1));
    });
  });
}
*/

export function rLimit(set, fn, l){
  return subsets(set,l).map(s => ()=> rAll(s,fn)).reduce((p, next)=> {
    return p.then(()=>{
      return next();
    })},Promise.resolve());
}

export function rSeq (set){
  return set.map(item => ()=> fn(item)).reduce((curr, next)=> {
    return curr.then(()=>{
      return next();
    })},Promise.resolve());
}

function subsets(original, subsetSize){
  let a = [];
  for (let i = 0; i < original.length; i += subsetSize){
    a.push(original.slice(i, i+subsetSize));
  }
  return a;
}

