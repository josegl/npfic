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
your promises with fault tolerance. 

It is like a powerful `Promise.all`.
With `Promise.all` if everything goes ok you get an array of results. And that's amazing. 
But what happen if something goes wrong? If you have an array of 1 million items and only 1
fails, all of them fails, and maybe those that have failed could be tried again later. 
Npfic *allways returns a promise that resolves an array which has the same size of the 
given input array*


## <a name='Examples'></a>2. Examples.
## <a name='api'></a>3. API reference.
## <a name='oldapi'></a>4. Old APIs reference.
