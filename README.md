# npfic is Node Promises Flow Iteration Control.

This is a pure native javascript ES6/2015 function library with no third party deps which
provides you the following functionality:
* **Apply an asynchronous proccess to all items of an iterable structure like an array, with failure
  tolerance.**

This means you can apply the asynchronous proccess to all items at once. If the process for some of the items fails, the entire process does not
stop, it will apply the process to all the remaining items. Once the entire process has finished, you can continue doing more stuff.

* **Apply an asynchronous proccess to all items of an iterable structure like an array, by
  subsets and with failure tolerance.**

This is similar to the previous one, but instead of running the process to all items at once, you
can limit it to run n items each time, so only n will be run at time, when they finish, then next
n items will be run, and so on.

* **Apply an asynchronous proccess to all items of an iterable structure like an array, and run n
  per second.**

This is similar to the first one, but instead of running the process to all items at once, you
can limit it to run n items each second, this is useful when you need to connect an API with
usage limits, you can just adjust how many items you want to process each second to be the same as
the API limits, so the entire process of all elements will be the fastest (only if the item
process time is low enough to reach the API limit usage, keep this in mind).

##API

### `rAll(set, fn)`
**Definition:** Apply the function `fn` to all items of `set`, where `set` is an iterable
structure like an array.

**`fn` specification:** `fn` must be an abstraction of the whole asynchronous process to be applied to a
single item. It must return a promise, or a _thenable_ object.

**Why that function name?** Its for resolve all the fn promises for each item of the array.

#### Example
```javascript
import rAll from 'npfic';

function step1 (item){
  return new Promise((resolve, reject) => {
    if (item % 2 === 1)
      reject(new Error('Item no valid'));
    setTimeout(()=>{
      resolve('step 1 for item ' + item);
    }, 1000);
  });
}

function step2 (item){
  return new Promise((resolve, reject) => {
     setTimeout(()=>{
       resolve('step 2 for item ' + item);
     }, 1000);
  });
}

function step3 (item){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('step 3 for item ' + item);
    }, 1000);
  });
}

function processItem (item) {
  return step1(item).then(result =>{
     console.log(result);
     return step2(item);
  }).then(result =>{
     console.log(result);
     return step3(item);
  }).then(result =>{
     console.log(result);
     return ('finished process of item ' + item);
  }).catch(err =>{
     throw (err);
  });
}

function main(){
  let a = [1,2,3,4,5,6,7,8,9,10];
  rAll(a, processItem).then(result => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
}

main();
```

**NOTE:** It is up to you to return a result, if you don't want any verbosity, then feel free to
do not return any result.

### `rES(set, fn, n, i[optional])`
**Definition:** Apply the function `fn` to all items of `set`, where `set` is an iterable, and
run n process each second.
structure like an array.

**`fn` specification:** `fn` must be an abstraction of the whole asynchronous process to be applied to a
single item. It must return a promise, or a _thenable_ object.

**n definition**: This is a possitive integer number which specifies how many process can be run
each second.

**i definition**: This is a possitive integer number which specifies the initial iterable
structure index to be process. 0 if no present when the function is called.

**Why that function name?** Its for resolve n fn promises Each Second for each item of the array.

#### Example
```javascript
import rES from 'npfic';

function step1 (item){
  return new Promise((resolve, reject) => {
    if (item % 2 === 1)
      reject(new Error('Item no valid'));
    setTimeout(()=>{
      resolve('step 1 for item ' + item);
    }, 1000);
  });
}

function step2 (item){
  return new Promise((resolve, reject) => {
     setTimeout(()=>{
       resolve('step 2 for item ' + item);
     }, 1000);
  });
}

function step3 (item){
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve('step 3 for item ' + item);
    }, 1000);
  });
}

function processItem (item) {
  return step1(item).then(result =>{
     console.log(result);
     return step2(item);
  }).then(result =>{
     console.log(result);
     return step3(item);
  }).then(result =>{
     console.log(result);
     return ('finished process of item ' + item);
  }).catch(err =>{
     throw (err);
  });
}

function main(){
  let a = [1,2,3,4,5,6,7,8,9,10];
  rES(a, processItem, 5).then(result => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
}

main();
```

**NOTE:** It is up to you to return a result, if you don't want any verbosity, then feel free to
do not return any result.
