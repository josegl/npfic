export function rAll(arr, fn){
  return new Promise((resolve, reject) => {
    return arr.map(item => ()=> fn(item)).forEach(proc => {
      return proc().then(res => {
        resolve();
      }).catch(err=>{
        console.log(err);
      });
    });
  });
}

export function rES(set, fn, n){
  return rSeq(set, ()=>setTimeout(fn,Math.floor(1000/n)));
}

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

