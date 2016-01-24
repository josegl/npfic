export function rAll(fn){
  return function (arr){
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
}

export function rES(set, fn, n){
  return new Promise((resolve, reject)=>{
    set.map(item => ()=> fn(item)).reduce((curr, next)=> {
      curr.then(()=>{
        setTimeout(()=>{
          return resolve(next());
        }, Math.floor(1000/n));
    })},Promise.resolve());
  });
}

export function rSubSeq (set, fn, l){
  return rSeq(subsets(set,l), rAll(fn));
}

export function rSeq (set, fn){
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

