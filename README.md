# npfic is Node Promises Flow Iteration Control.
[![Build Status](https://travis-ci.org/josegl/npfic.svg?branch=master)](https://travis-ci.org/josegl/npfic)
* [Motivation](#motivation)
* [Introduction](#intro)
* [How to install](#install)
* [How to use](#use)
    * [Full ES6/7 Environment](#es67)
    * [Only native promises support](#onlyp)
* [API](#api)
    * [rAll](#rall)
    * [rES](#res)
    * [rLimit](#rlimit)

<a name='motivation'></a>
## Motivation
In my everyday work I usually need to iterate over a bunch of asynchronous functions which are a
cascade process to a single item. Before ES6 was standart and Nodejs didn't have builtin native
promises, I used the great async lib to build cascades, and to iterate over asynchronous process.

But one day native Promises came to Nodejs, and I realized that I could build a cascade asynchronous process
in a very easy way with Promises. After that I continued using async for iterate over my own
native cascades made with Promises. 

Suddenly, one day I realized I was getting a very strange error wwhich, after many debugging
hours, was related to how async was working when for a bunch of process I need all of them to be
executed even if some of them give me errors, I could fix the issue, but I didn't like the
solution, in fact, I didn't like to use async when I actually knew I could get the same functionality (at least the functionality I needed) with
native code. So at this point is when I start to develop npfic.

If you need async in your project, but you are running a Nodejs version with native Promises
support, and you only use async to take control of Promises iteration, then Npfic is good for
you.

<a name='intro'></a>
## Introduction

Npfic is a **pure native javascript ES6/2015 function library with no third party deps**, written following the [suckless philosophy](http://suckless.org/philosophy), which provides you the following functionality:

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

<a name='install'></a>
## How to install.
As the others npm packages: 
`npm install npfic`

<a name='use'></a>
## How to use.
<a name='es67'></a>
#### With full ES6/7 environment.
You only need to import the function or functions you are going to use:
```javascript
import rAll, rES, rLimit from 'npfic';
```

<a name='onlyp'></a>
#### With only native promises support.
You can require the package as the usually:
```javascript
var npfic = require('npfic');
npfic.rAll();
npfic.rES();
npfic.rLimit();
```
<a name='api'></a>
##API

<a name='rall'></a>
### `rAll(set, fn)`
**Definition:** Apply the function `fn` to all items of `set`, where `set` is an iterable
structure like an array. It returns a Promise.

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

<a name='res'></a>
### `rES(set, fn, n, [i])`
**Definition:** Apply the function `fn` to all items of `set`, where `set` is an iterable, and
run n process each second.
structure like an array. It returns a Promise.

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

<a name='rlimit'></a>
### `rLimit(set, fn, l, [i])`
**Definition:** Apply the function `fn` to all items of `set`, where `set` is an iterable, and
apply to l items each time. It retuns a Promise

**`fn` specification:** `fn` must be an abstraction of the whole asynchronous process to be applied to a
single item. It must return a promise, or a _thenable_ object.

**l definition**: This is a possitive integer number which specifies how many process can be run
each time.

**i definition**: This is a possitive integer number which specifies the initial iterable
subset to be process. 0 if no present when the function is called.

**Why that function name?** Its for resolve Limit l promises each time.

#### Example
```javascript
import rLimit from 'npfic';

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
  rLimit(a, processItem, 3).then(result => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
}

main();
```

**NOTE:** It is up to you to return a result, if you don't want any verbosity, then feel free to
do not return any result.
