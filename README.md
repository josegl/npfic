# node-promises-iteration
This is a pure native javascript ES6/2015 function library, no third party deps.

Very often you have to apply a cascade process to an iterable structure such an array. 
The `process` should be applied to each item in the iterable structure, and that `process` 
is a composition of many subprocess, where result of `subprocess1` is taken by `subprocess2` and so on. If you cannot guarantee that the process execution is going to be successfully for all items, but all of them must be process, then you need error toleration.
