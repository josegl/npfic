import chai from 'chai';
import { rAll, rES, rSubSeq, rSeq, rDelaySeq } from '../src/index';
import {
  asyncDouble,
  asyncDoubleOnlyPairs
} from './helpers';


describe('Promises resolve flow control', ()=>{
  describe('rAll 10 items, double each item asynchronously', ()=>{
    it('rall should return an array with the items doubled, and should take 0.5s', done => {
      const items = [1,2,3,4,5,6,7,8,9,10];
      const init = Date.now();
      rAll(asyncDouble)(items).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => i*2));
        chai.assert.equal(Math.floor((end-init)/500), 1);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rAll 10 items, double pairs items asynchronously', ()=>{
    it('should return an array with pairs items doubled, or error items, and should take 0.5s', done => {
      const items = [1,2,3,4,5,6,7,8,9,10];
      const init = Date.now();
      rAll(asyncDoubleOnlyPairs)(items).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => {
          if (i % 2 === 0){
            return i*2;
          } else {
            return {error: 'No pair number'};
          }
        }));
        chai.assert.equal(Math.floor((end-init)/500), 1);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSeq 10 items', ()=>{
    it('should return an array with items doubled, and should take 5s', done => {
      const items = [1,2,3,4,5,6,7,8,9,10];
      const init = Date.now();
      rSeq(asyncDouble, items).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => i*2 ));
        chai.assert.equal(Math.floor((end-init)/1000), 5);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSeq 10 items with errors', ()=>{
    it('should return an array with pairs items doubled or error if non-pair, and should take 5s', done => {
      const items = [1,2,3,4,5,6,7,8,9,11];
      const init = Date.now();
      rSeq(asyncDoubleOnlyPairs, items).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => {
          if (i % 2 === 0){
            return i*2;
          } else {
            return {error: 'No pair number'};
          }
        }));
        chai.assert.equal(Math.floor((end-init)/1000), 5);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSeq 10 items in 5 chunks of size 2', ()=>{
    it('should return an array with pairs items doubled and take ~2500 ms', done => {
    
      const items = [1,2,3,4,5,6,7,8,9,10];
      const init = Date.now();
      rSubSeq(asyncDouble, items, 2).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result,
          [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]
        );
        const takesAround2AndAhalfSecs = (((end-init) - 2500) <= 50);
        chai.assert.isTrue(takesAround2AndAhalfSecs);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSeq 10 items in 5 chunks of size 2 with errors', ()=>{
    it('should return an array with pairs items doubled, non pair items error and take ~2500 ms', done => {
    
      const items = [1,2,3,4,5,6,7,8,9,11];
      const init = Date.now();
      rSubSeq(asyncDoubleOnlyPairs, items, 2).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => {
          if (i % 2 === 0){
            return i*2;
          } else {
            return {error: 'No pair number'};
          }
        }));
        const takesAround2AndAhalfSecs = (((end-init) - 2500) <= 50);
        chai.assert.isTrue(takesAround2AndAhalfSecs);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSeq 10 items in 10 chunks of size 1 with all errors', ()=>{
    it('should return an array errors and take ~5000 ms', done => {
      const items = [1,1,1,1,1,1,1,1,1,11];
      const init = Date.now();
      rSubSeq(asyncDoubleOnlyPairs, items, 1).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => {
          if (i % 2 === 0){
            return i*2;
          } else {
            return {error: 'No pair number'};
          }
        }));
        const takesAround2AndAhalfSecs = (((end-init) - 5000) <= 50);
        chai.assert.isTrue(takesAround2AndAhalfSecs);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSeq 10 items in 1 chunks of size 10 with all errors', ()=>{
    it('should return an array errors and take ~500 ms', done => {
      const items = [1,1,1,1,1,1,1,1,1,11];
      const init = Date.now();
      rSubSeq(asyncDoubleOnlyPairs, items, 10).then(result =>{
        const end = Date.now();
        debugger;
        chai.assert.deepEqual(result, items.map(i => {
          if (i % 2 === 0){
            return i*2;
          } else {
            return {error: 'No pair number'};
          }
        }));
        const takesAround2AndAhalfSecs = (((end-init) - 500) <= 50);
        chai.assert.isTrue(takesAround2AndAhalfSecs);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rDelaySeq 10 items, delay 500 ms each one. All errors', ()=>{
    it('should return an array errors and take ~10 s', done => {
      const items = [1,1,1,1,1,1,1,1,1,11];
      const init = Date.now();
      rDelaySeq(asyncDoubleOnlyPairs, items, 500).then(result =>{
        const end = Date.now();
        chai.assert.deepEqual(result, items.map(i => {
          if (i % 2 === 0){
            return i*2;
          } else {
            return {error: 'No pair number'};
          }
        }));
        const takesAround2AndAhalfSecs = (((end-init) - 10000) <= 50);
        chai.assert.isTrue(takesAround2AndAhalfSecs);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
});
