export function rAll (iterable, fn){
  return new Promise((resolve,reject) => {
    let checker = checkRAllArgs(iterable, fn);
    if (checker.error)
      return reject(checker.error);
    let iterator = iterable.map(i => fn(i))[Symbol.iterator]();
    let item  = iterator.next();
    while (!item.done) {
      item.value.then(result => {
        if(result)
          console.log(result);
        if (item.done)
          resolve();
      });
      item = iterator.next();
    }
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

function subsets(original, subsetSize){
  let a = [];
  for (let i = 0; i < original.length; i += subsetSize){
    a.push(original.slice(i, i+subsetSize));
  }
  return a;
}

function checkRAllArgs(set, fn){
  let result = {};
  if (!set[Symbol.iterator])
    result.error = new Error('rAll: the set is not iterable');
  else if (!/function/.test(typeof(fn)))
    result.error = new Error('rAll: The function to execute is not a function');
  return result;
}

function checkRESArgs(set, fn, n, i){
  let result = {};
  if (!set[Symbol.iterator])
    result.error = new Error('rES: the set is not iterable');
  else if (!/function/.test(typeof(fn)))
    result.error = new Error('rES: The function to execute is not a function');
  else if (n <= 0)
    result.error = new Error('rES: Zero or negative limit not allowed');
  else if (i < 0)
    result.error = new Error('rES: Negative iterable index are not allowed');
  return result;
}

function checkRLimitArgs(set, fn, l, i){
  let result = {};
  if (!set[Symbol.iterator])
    result.error = new Error('rLimit: the set is not iterable');
  else if (!/function/.test(typeof(fn)))
    result.error = new Error('rLimit: The function to execute is not a function');
  else if (l <= 0)
    result.error = new Error('rLimit: Zero or negative limit not allowed');
  else if (i < 0)
    result.error = new Error('rLimit: Negative iterable index are not allowed');
  return result;
}

