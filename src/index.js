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
  return rSeq(promisy(fn, n))(set);
}

const promisy = (fn, n) => {
  return function (i){
    return new Promise((resolve, reject) => {
      setTimeout(() =>{
        resolve(fn(i));
      },Math.floor(1000/n));
    });
  }
}

export function rSubSeq (set, fn, l){
  return rSeq(rAll(fn))(subsets(set,l));
}

export function rSeq (fn){
  return function (set){
    return set.map(item => ()=> fn(item)).reduce((curr, next)=> {
      return curr.then(()=>{
        return next();
      })},Promise.resolve());
  }
}

function subsets(original, subsetSize){
  let a = [];
  for (let i = 0; i < original.length; i += subsetSize){
    a.push(original.slice(i, i+subsetSize));
  }
  return a;
}

