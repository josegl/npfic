#NPFIC Node Promises Flow Iteration Control.
[![Build Status](https://travis-ci.org/josegl/npfic.svg?branch=master)](https://travis-ci.org/josegl/npfic)
[![npm version](https://img.shields.io/npm/v/npfic.svg?style=flat-square)](https://www.npmjs.com/package/npfic)

## Index
1. [What is npfic for](#about)
2. [Examples](#Examples)
3. [API reference](#api)
4. [Old API reference](#oldapi)
  * [v 2.0](#v2)
  * [v 1.0](#v1)

## <a name='about'></a>1. What is npfic for.
Npfic is a extremely thin library which provides you few functions in order to control 
your promises, when you want to apply asynchronous proccesses to many items in bulk. 

It provides you fault tolerance. Npfic always returns a Promise which resolves an 
array of the same length of the given one. 

It is like a powerful `Promise.all`.
With `Promise.all` if everything goes ok you get an array of results. And that's amazing. 
But what happen if something goes wrong? If you have an array of 1 million items and only 1
fails, all of them fails, and maybe those that have failed could be tried again later. 
Npfic **allways returns a promise that resolves an array which has the same size of the 
given input array**, and returns at the same index, or the result of the given promise for
the given index value, or an object with an error like this: `{error: 'the error'}`. 

Unfortunately, we cannot run as many process *in parallell* (remember that javascript is
not concurrent unless you build your application with clusters). So maybe what you want is
to iterate over a Promises array. You might already know that it's no so easy to iterate
over Promises, so Npfic provides you a function which try to resolve all the promises in
sequence, and then returns you a new Promise which resolves an array of the same size
as the one given, just like the case above.

Npfic even can run subsets of your items in parallell. Imagine you have an array of 1 
trillion items which you may want to send through an API, but that API has a limit of 
1 million items per time. Npfic provides you a mechanism which will split the array
in many subarrays of the length that you specify, and will run the given function in 
parallell over all the items of each subarray. And will complete each subarray in the 
same way in sequence. For this, Npfic will return you a function which will resolve an 
array of the same length of the given one, with the results if any, or error items for 
the items that might have failed. 

Do you like what you have just read? Read the next examples section to see Npfic in action.

## <a name='Examples'></a>2. Examples.
## <a name='api'></a>3. API reference.
## <a name='oldapi'></a>4. Old APIs reference.
