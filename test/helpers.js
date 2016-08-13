export function asyncDouble(number){
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      resolve(number*2);
    },500);
  })
}

export function asyncDoubleOnlyPairs(number){
  return new Promise((resolve, reject) =>{
    setTimeout(()=>{
      if (number % 2 === 0){
        resolve(number*2);
      } else {
        reject('No pair number');
      }
    },500);
  })
}
