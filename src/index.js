export function resolveAll (fn, items){
  return new Promise((resolve,reject) => {
    for (let i = 0; i < items.length; i++){
      fn(items[i]).then(result => {
        if (result)
          console.log(result);
        if (i === this.length - 1)
          resolve('all finished');
      }).catch(err =>{
        console.log(err);
        if (i === items.length - 1)
          resolve('all finished');
      });
    }
  });
}

/**
 * array: function fn is applied to the items
 * @fn: the function to aply to each item of the array,
 * @n: number of processes to be executed each second
 * @j: function will be applied to all items from index j, 0 by default
 */
export function eachSecond(array, fn, n, j){
  let i = j ? j : 0;
  return new Promise((resolve,reject) => {
    if (i >= array.length)
      return resolve();
    else {
      setTimeout(() => {
        fn(array[i]).then(result => {
          if (result)
            console.log(result);
          return eachSecond(array, fn, n, i+1);
        }).then(result => {
          resolve(result);
        }).catch(err =>{
          if (err)
            console.log(err);
          return resolve(eachSecond(array, fn, n, i+1));
        });
      },Math.floor(1000/n));
    }
  });
}
