export function rAll (items, fn){
  return new Promise((resolve,reject) => {
    for (let i = 0; i < items.length; i++){
      fn(items[i]).then(result => {
        if (result)
          console.log(result);
        if (i === items.length - 1)
          resolve();
      }).catch(err =>{
        console.log(err);
        if (i === items.length - 1)
          resolve();
      });
    }
  });
}

/**
 * rES = resolveEachSecond
 * array: function fn is applied to the items
 * @fn: the function to aply to each item of the array,
 * @n: number of processes to be executed each second
 * @j: function will be applied to all items from index j, 0 by default
 */
export function rES(array, fn, n, j){
  let i = j ? j : 0;
  return new Promise((resolve,reject) => {
    if (i >= array.length)
      return resolve();
    else {
      setTimeout(() => {
        fn(array[i]).then(result => {
          if (result)
            console.log(result);
          return rES(array, fn, n, i+1);
        }).then(result => {
          resolve(result);
        }).catch(err =>{
          if (err)
            console.log(err);
          return resolve(rES(array, fn, n, i+1));
        });
      },Math.floor(1000/n));
    }
  });
}

export function rLimit(set, fn, l, i = 0){
  return new Promise ((resolve, reject) => {
    if (i >= subsets(set,l).length)
      resolve();
    else {
      rAll(subsets(set,l)[i]).then(()=>{
        return rLimit(set, fn, l, i+1);
      }).then(()=> {
        resolve();
      }).catch(err => {
        if (err)
          console.log(err);
        return resolve(rLimit(set, fn, l, i+1));
      });
    }
  });
}

function subsets(original, subsetSize){
  let a = [];
  for (let i = 0; i < original.length; i += subsetSize){
    a.push(original.slice(i, i+subsetSize));
  }
  return a;
}
