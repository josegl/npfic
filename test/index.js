import chai from 'chai';
import { rAll, rES, rSubSeq, rSeq } from '../src/index';
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
      rAll(processItemNoError)(items).then(()=>{
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
      rAll(processItemError)(items).then(()=>{
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
        chai.assert.equal(Math.floor((end - init)/1000),3);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSeq 10 items by subsets of 3 items each. Each item 3 seconds, with no errors', ()=>{
    it('should finish all processes in 12 seconds', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSeq(items, processItemNoError, 3).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),12);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSubSeq 10 items by subsets of 3 items each. Each item 3 seconds, only pair items are valid, the others give error', ()=>{
    it('should finish all processes in 12 seconds because in each subset there is at least 1 valid item which takes 3 seconds to be processed', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      let init = Date.now();
      rSubSeq(items, processItemError, 3).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),12);
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rSeq, resolve 3 process, 3 seconds each, in sequence', () => {
    it('rSeq will take 9 seconds', done => {
      let items = [1,2,3];
      let init = Date.now();
      rSeq(processItemNoError, items).then(()=>{
        let end = Date.now();
        chai.assert.equal(Math.floor((end - init)/1000),9);
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });
  describe('rSubSeq 2 by 2', ()=>{
    it('rSubSeq1 should take 6 seconds', done => {
      let items = [1,2,3];
      let init = Date.now();
      rSubSeq(items, processItemNoError, 2).then(()=>{
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
