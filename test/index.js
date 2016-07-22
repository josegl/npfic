import chai from 'chai';
import { rAll, rES, rSubSeq, rSeq } from '../src/index';
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
        debugger;
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
});
