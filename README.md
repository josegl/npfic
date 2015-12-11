# node-promises-iteration
This is a pure native javascript ES6/2015 function library, no third party deps.

Very often you have to apply a cascade process to an iterable structure such an array. 
The `process` should be applied to each item in the iterable structure, and that `process` 
is a composition of many subprocess, where result of `subprocess1` is taken by `subprocess2` and so on. If you cannot guarantee that the process execution is going to be successfully for all items, but all of them must be processed, then you need failure toleration.

If this is your case, and you like to use native pure functional programming, then continue
reading this, if not, continue anyway, perhaps you could give me some advices.

Javascript built-in Promises are great to make asynchronous processes, cascade processes and all
that stuff.
I am going to follow a simple example.Let's say we have the following code:

```
let items = [1,2,3,4,5,6,7,8,9,10];
```
Each item is going to need to pass through 3 steps, where each step will need the result of the previous step. And each step is an asynchronous process (perhaps an API call)
this are the steps

```
function step1 (item){
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            resolve(item + 1);
        },300);
    });
}

function step2 (value){
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            resolve(value + 2);
        },300);
    });
}

function step3 (value){
    return new Promise ((resolve, reject) => {
        setTimeout(()=> {
            resolve(value + 3);
        },300);
    });
}
```
