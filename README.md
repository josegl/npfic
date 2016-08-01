[![Build Status](https://travis-ci.org/josegl/npfic.svg?branch=master)](https://travis-ci.org/josegl/npfic)
[![npm version](https://img.shields.io/npm/v/npfic.svg?style=flat-square)](https://www.npmjs.com/package/npfic)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

#NPFIC
Failure tolerant flow control mechanism for native javascript Promises bulk resolution.
Always returns a Promise that resolves an array of the same length of the given one, for
the matching index you will get the result expected or an `{error: 'the error'}` object.

Npfic is extremely thin with just 1.1 Kb of non uglified nor gzipped code and has no third
party deps.

# Table of contents.
1. [Requirements](#requirements)
2. [Installation](#Installation)
  * [Nodejs](#installNodejs)
  * [Browser](#Browser)
3. [Examples](#examples)
4. [API reference](#api)
5. [Old API reference](#oldapi)
  * [v 2.0](#v2)
  * [v 1.0](#v1)

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
```javascrip
import { rAll, rDelaySeq, rSeq, rSubSeq } from 'npfic'
```

**Classic require**
```javascript
const rAll      = require('npfic').rAll
const rDelaySeq = require('npfic').rDelaySeq
const rSubSeq   = require('npfic').rSubSeq
const rSeq      = require('npfic').rSeq
```

### <a name='installNodejs'></a>2.1. Browser.
`npm install --save npfic`

## <a name='Examples'></a>2. Examples.
## <a name='api'></a>3. API reference.
## <a name='oldapi'></a>4. Old APIs reference.
