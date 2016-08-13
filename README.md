[![Build Status](https://travis-ci.org/josegl/npfic.svg?branch=master)](https://travis-ci.org/josegl/npfic)
[![npm version](https://img.shields.io/npm/v/npfic.svg?style=flat-square)](https://www.npmjs.com/package/npfic)

#NPFIC
Failure tolerant flow control mechanism for native javascript Promises bulk resolution.
Always returns a Promise that resolves an array of the same length of the given one, for
the matching index you will get the result expected or an `{error: 'the error'}` object.

Npfic is extremely thin with just 1.1 Kb of non uglified nor gzipped code and has no third
party deps.

# Table of contents.
1. [Requirements](#requirements)</br>
2. [Installation](#Installation)</br>
  * [Nodejs](#installNodejs)</br>
  * [Browser](#installBrowser)</br>
3. [Examples](#examples)</br>
  3.1 [rAll example](#rall-example)</br>
  3.2 [rSeq example](#rSeq-example)</br>
  3.3 [rDelaySeq example](#rDelaySeq-example)</br>
  3.4 [rSubSeq example](#rSubSeq-example)</br>
4. [API reference](#api)</br>
5. [License](#license)</br>

## <a name='requirements'></a>1. Requirements.
Npfic provides mechanisms to control Promises flow, but does not provide a promises 
polyfill, so if you don't have an enviroment that provides a promise polyfill, or native
javascript promises, you must provide your own.

If you are using a modern browser or transpilling ES6 you don't have anything to worry 
about.

## <a name='installation'></a>2. Installation.
### <a name='installNodejs'></a>2.1. Nodejs.
`npm install --save npfic`

Then you can choose between the classic `require` and the modern `import` ways:</br>
**ES6 import**</br> 
```javascript
import { rAll, rDelaySeq, rSeq, rSubSeq } from 'npfic'
```

**Classic require**
```javascript
const rAll      = require('npfic').rAll;
const rDelaySeq = require('npfic').rDelaySeq;
const rSubSeq   = require('npfic').rSubSeq;
const rSeq      = require('npfic').rSeq;
```

### <a name='installBrowser'></a>2.1. Browser.
`<scipipt type="text/javascript" src="//npmcdn.com/npfic"></script>`

## <a name='Examples'></a>3. Examples.
In this section you will notice how Npfic provides you different functions which provides
you an extreme powerful `Promise.all` that never fails.

### <a name='rAll-example'></a>3.1. rAll example.
`rAll` is the function that allows you to resolve promises in parallel. It is the one 
which is most similar to `Promise.all`

Lets say we want to do something with different resources that are in different hosts:

```javascript
const resource1 = 'https//resource1host.com';
const resource2 = 'https//resource2host.com';
const resource3 = 'https//resource3host.com';
const resource4 = 'https//resource4host.com';
const resources = [resource1, resource2, resource3, resource4];
```

Now we can generalize a function for fetching one resource with promises.
 I'm going to assume that we are using `fetch` which is Promise ready, so I don't need
 an extra function.</br>
 </br>
 So now that we already have a way to fetch one of the resources, let's say that 
 resource2 is temporary unavailable. Let's compare `rAll` and `Promise.all`</br>
 
**Promise.all** 
```javascript
Promise.all(resources.map(resource => fetch(resource))).then(resolvedResources => {
  //Do something with the resources
}).catch(error => {
  console.log(error);
});
```

In the above code snippet if resource2 is not available for whatever reason. You will 
always go to the `catch` branch of the Promises cascade.

Let's see what happens with `rAll`:</br>
```javascript
rAll(fetch)(resources).then(resolvedResources => {
  const fetchedResources = resolvedResources.filter(resouce => !resource.error);
  // do something with fetchedResources
}).catch(error => {
  console.log(error);
});
```

rAll will never go througth the catch branch unless there is a coding error. So rAll 
for the example above will return a Promise which resolves this array:
```javascript
[resource1-data, {error: 'Network error, timeout bla bla'}, resource3-data, resource4-data]
```

And as `Promise.all` all the promises are resolved in parallel.

### <a name='rSeq-example'></a>3.2. rSeq example.
`rSeq` is the function that allows you to resolve promises in sequence. 
Let's say you want to do a for loop to iterate over Promises, and you want to retrieve
the data from the Promise resolution before the start of the next one.
There is not an easy way to achieve this with native and plain javascript, so `rSeq` is
here to help you.</br>

In this example we want to retrieve some resources from an API that has a limit of just
one connection per client. So you cannot retrieve all the resources at the same time.

```javascript
const resource1 = 'https//api.com';
const resource2 = 'https//api.com';
const resource3 = 'https//api.com';
const resource4 = 'https//api.com';
const resources = [resource1, resource2, resource3, resource4];
```

Let's see how could we solve this with `rSeq` assuming we already have the fetch function
which retrieves a resource from its url.
```javascript
rSeq(fetch, resources).then(res => {
  const fetchedResources = res.filter(r => !r.error);
}).catch(error => {
  //do something with the resources
  console.log(error); // this will be not reached unless a true catastrophic error
});
```

As you can see is quite simple use this function, it is like a Promise.all that never 
fails, and in this case will apply the `fetch` function to all items in the resources
array in sequence. Once the first one has finished, the second one will start and so on.
in sequence.

### <a name='rDelaySeq-example'></a>3.3. rDelaySeq example.
This is just like `rSeq` shown in the example above but adding a delay of n millisecs 
between the resolution of each array element:

```javascript
rDelaySeq(fetch, resources, 300).then(res => {
  const fetchedResources = res.filter(r => !r.error);
}).catch(error => {
  //do something with the resources
  console.log(error);
});
```

### <a name='rSubSeq-example'></a>3.4. rSubSeq example.
This is a combination of `rAll` and `rSeq`. If for whatever reason you only can resolve
your promises in chunks of a size lower than all the items length that you have, then 
`rSubSeq` will execute the promises in parallell by chunks, so if you have 10 items and
can process only chunks of size 2 in parallell, `rSubSeq` can deal with it. 
And like all the other npfic functions will return a promise that resolves an array 
of the original items length.

```javascript
rSubSeq(fetch, resources, 2).then(res => {
  const fetchedResources = res.filter(r => !r.error);
}).catch(error => {
  //do something with the resources
  console.log(error);
});
```
**Note:** If you specify a chunk of size 1 the effect will be the same than using `rSeq`
as you may expect.
## <a name='api'></a>4. API reference.
I will use the Haskell functions signature.
### rAll :: Promise fn -> Array a -> Promise p
`rAll` takes as first argument a function that returns a Promise, and will return another
function that takes an array as only argument. 
its implementation is as follows:
```javascript
export rAll = fn => arr => Promise.all(array.map(item => fn(item).then(res => res)
  .catch(error => ({error}))));
```

So to use it:
```javascript
rAll(fn)(array).then(res => //do whatever you need);
```

This function applies the function `fn` to all the items of the `a` array in 
**parallell** and returns a Promise `p` which resolves an array of the same length 
of the given array
`a`

### rSeq :: (Promise fn -> Array a) -> Promise p
`rSeq` is a function that takes two arguments, the first one is a function `fn` which 
returns a Pomise and will be applied to all the items of the array `a`, which is the
second argument. This functions returns a Promise `p` which resolves an array of the
same length of the array `a`. This function will apply the function `fn` to all the 
items of the `a` array in **sequence**.

### rDelaySeq :: (Promise fn -> Array a, Integer n) -> Promise p
`rDelaySeq` is a function that takes three arguments: the first one is a function `fn` 
which must return a Promise and will be applied to all the items of the array `a`, which
is the second argument. The third argument is a positive Integer `n` which is the number 
of milliseconds that you want to delay the application of the `fn` function to each 
item of the array `a`. So `rDelaySeq` will wait `n` milliseconds between the execution
of the `fn` function applied to each item of the array `a` generating a delayed sequence.

This function will return a Promise p which will resolve an array of the same length of
the given array `a`.

### rSubSeq :: (Promise fn -> Array a, Integer n) -> Promise p
`rSubSeq` is a function that takes three arguments: the first one is a function `fn` 
which must return a Promise and will be applied to all the items of the array `a`, which
is the second argument. The third argument is a positive Integer `n` which is the chunk 
size that you want to resolve in parallell. So `rSubSeq` will split the `a` array 
in a new array of arrays of `n` length and will execute `rAll` to each subarray.

This function will return a Promise p which will resolve an array of the same length of
the given array `a`.

## <a name='license'></a>5. License.
MIT
