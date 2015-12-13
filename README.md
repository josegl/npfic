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
