import chai from 'chai';
import { rAll, rES, rLimit } from '../src/index';
import {
  processItemError,
  processItemNoError,
  fastrESNoError,
  fastrESError
} from './helpers';


describe('Promises resolve flow control', ()=>{
  describe('rAll with no errors', ()=>{
    it('should finish all processes', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rAll(items, processItemNoError).then(()=>{
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rAll with errors', ()=>{
    it('should finish all processes', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rAll(items, processItemError).then(()=>{
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rES with no errors', ()=>{
    it('should finish all processes', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rES(items, fastrESNoError, 1).then(()=>{
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rES with errors', ()=>{
    it('should finish all processes', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rES(items, fastrESError, 5).then(()=>{
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
  describe('rLimit with no errors', ()=>{
    it('should finish all processes', done => {
      let items = [1,2,3,4,5,6,7,8,9,10];
      rLimit(items, processItemNoError, 3).then(()=>{
        done();
      }).catch(err => {
        throw err;
      });
    })
  });
});
