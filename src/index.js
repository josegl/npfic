export const rAll = fn => arr => {
  return new Promise((resolve, reject) => {
    return arr.map(item => ()=> fn(item)).forEach(proc => {
      return proc().then(res => {
        resolve();
      });
    });
  });
}

export const rES = (set, fn, n) => rSeq(i => {
  return new Promise ((resolve, reject) => {
    setTimeout(() =>{
      resolve(fn(i));
    },Math.floor(1000/n));
  });
},set);

export const rSubSeq = (set, fn, l) => rSeq(rAll(fn),subsets(set,l));

export const rSeq = (fn, set) => set.map(item => ()=> fn(item)).
  reduce((curr, next)=> {
    return curr.then(()=>{
      return  next();
    }).catch(err =>{
      return next();
    })},Promise.resolve());

const subsets = (original, subsetSize) => {
  let a = [];
  for (let i = 0; i < original.length; i += subsetSize){
    a.push(original.slice(i, i+subsetSize));
  }
  return a;
}

