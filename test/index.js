import chai from 'chai';
import { rAll, rES, rSubSet, rSeq } from '../src/index';
import {
  processItemError,
  processItemNoError,
  fastrESNoError,
  fastrESError,
  step1NoError,
  step2, step3
} from './helpers';


describe('Promises resolve flow control', ()=>{
  describe('rAll 10 items, 3 seconds each each item', ()=>{
    it('rall should finish all process in 3 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rAll(items, processItemNoError).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),3);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rAll 10 items, 3 seconds each item with errors', ()=>{
    it('should finish all processes in 3 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rAll(items, processItemError).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),3);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rES 10 items, 1 per second, each item 3 milliseconds', ()=>{
    it('should finish all processes in 10 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rES(items, fastrESNoError, 1).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),10);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rES 10 items, 5 per second, each item 3 milliseconds, with errors', ()=>{
    it('should finish all processes in 2 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rES(items, fastrESError, 5).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),2);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rES 10 items, trying a negative iterable index', ()=>{
    it('should throw an error', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rES(items, fastrESError, 5, -1).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),2);
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    })
  });
  describe('rSubSet 10 items by subsets of 3 items each. Each item 3 seconds, with no errors', ()=>{
    it('should finish all processes in 12 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSet(items, processItemNoError, 3).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),12);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSet 10 items by subsets of 3 items each. Each item 3 seconds, only pair items are valid, the others give error', ()=>{
    it('should finish all processes in 12 seconds because in each subset there is at least 1 valid item which takes 3 seconds to be processed', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSet(items, processItemError, 3).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),12);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSet 10 items by subsets of 3 items each. Each item 3 seconds, initial subset out of range', ()=>{
    it('should not process any item, taking whole process 0 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSet(items, processItemNoError, 3, 5).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),0);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSet 10 items by subsets of 3 items each. Each item 3 seconds, initial subset is the last one', ()=>{
    it('should process just item 10, taking whole process 3 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSet(items, processItemNoError, 3, 3).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),3);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSet 10 items by subsets of 13 items each. Each item 3 seconds', ()=>{
    it('should process all items, taking whole process 3 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSet(items, processItemNoError, 13).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),3);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSet with negative index', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rSubSet(items, processItemNoError, 13, -3).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    })
  });
  describe('rSubSet with negative limit', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rSubSet(items, processItemNoError, -2).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    })
  });
  describe('rAll with no function', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rAll(items, 'hi').then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    })
  });
  describe('rES with no function', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rES(items, 'hi', 5).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rSubSet with no function', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rSubSet(items, 'hi', 4).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rAll to a non iterable object', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = {1:1,2:2,3:3};
      rAll(items, processItemNoError).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rES to a non iterable object', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = {1:1,2:2,3:3};
      rES(items, processItemNoError, 4).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rSubSet to a non iterable object', ()=>{
    it('should throw an error and do not process anything', done => {
      let items = {1:1,2:2,3:3};
      rSubSet(items, processItemNoError, 2).then(()=>{
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rSeq, resolve 3 process, 3 seconds each, in sequence', () => {
    it('rSeq will take 9 seconds', done => {
      let items = [1,2,3];
      let init = Date.now();
      rSeq(items, processItemNoError).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),9);
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rSubSet 2 by 2', ()=>{
    it('rSubSet1 should take 6 seconds', done => {
      let items = [1,2,3];
      let init = Date.now();
      rSubSet(items, processItemNoError, 2).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),6);
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    })
  });
});
