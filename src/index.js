export const rAll = fn => arr => Promise.all(arr.map(item => fn(item).then(procItem => {
  return procItem;
}).catch(error => {
  return {error};
})));

export const rES = (set, fn, n) => rSeq(i => {
  return new Promise ((resolve, reject) => {
    setTimeout(() =>{
      resolve(fn(i));
    },Math.floor(1000/n));
  });
},set);

export const rSubSeq = (set, fn, l) => rSeq(rAll(fn),subsets(set,l));

export const rSeq = (fn, set) => new Promise((resolve, reject) => {
  let result = [];
  set.map(item => ()=> fn(item)).reduce((curr, next, i)=> {
    return curr.then(res=>{
      if(res) result.push(res);
      return next();
    }).catch(error =>{
      result.push({error});
    });
  },Promise.resolve()).then(res => {
    if(res) result.push(res);
    resolve(result);
  }).catch(error => {
    result.push({error});
    resolve(result);
  });
});

const subsets = (original, subsetSize) => {
  let a = [];
  for (let i = 0; i < original.length; i += subsetSize){
    a.push(original.slice(i, i+subsetSize));
  }
  return a;
}

