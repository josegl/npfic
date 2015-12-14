export function rLimit (items, fn){
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

export function rES(array, fn, n, i = 0){
  return new Promise((resolve,reject) => {
    i >= array.length ? resolve() : setTimeout(() => {
      fn(array[i]).then(result => {
        if (result)
          console.log(result);
        return rES(array, fn, n, i+1);
      }).then(result => {
        resolve(result);
      }).catch(err =>{
        if (err)
          console.log(err);
        resolve(rES(array, fn, n, i+1));
      });
    },Math.floor(1000/n));
  });
}

export function rLimit(set, fn, l, i = 0){
  return new Promise ((resolve, reject) => {
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
