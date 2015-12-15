export function rAll (set, fn){
  return new Promise((resolve,reject) => {
    if (!set[Symbol.iterator])
      return reject(new Error('rAll: the object to apply the function to is not iterable'));
    if (typeof fn !== 'function')
      return reject(new Error('rAll: second argument is not a function'));
    for (let i = 0; i < set.length; i++){
      fn(set[i]).then(result => {
        if (result)
          console.log(result);
        if (i === set.length - 1)
          resolve();
      }).catch(err =>{
        console.log(err);
        if (i === set.length - 1)
          resolve();
      });
    }
  });
}

export function rES(set, fn, n, i = 0){
  return new Promise((resolve,reject) => {
    if (!set[Symbol.iterator])
      return reject(new Error('rES: the object to apply the function to is not iterable'));
    if (typeof fn !== 'function')
      return reject(new Error('rES: second argument is not a function'));
    if (i < 0)
      return reject(new Error('rES: Negative iterable index are not allowed'));
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
    if (!set[Symbol.iterator])
      return reject(new Error('rLimit: the object to apply the function to is not iterable'));
    if (typeof fn !== 'function')
      return reject(new Error('rLimit: second argument is not a function'));
    if (i < 0)
      return reject(new Error('rLimit: Negative index are not allowed'));
    if (l <= 0)
      return reject(new Error('rLimit: Zero or negative limits are not allowed'));
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
