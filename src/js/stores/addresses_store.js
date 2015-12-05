'use strict';

const Immutable = require('immutable');
const BaseStore = require('./base_store');
const request = require('superagent');

const Dispatcher = require('../dispatcher');

let _addresses = Immutable.Map();

const _arrayToObj = function(arr){
  return arr.reduce( (o,e) => {
    o[e.id] = _calculate(e);
    return o;
  },{})
}

const _calculate = function(add){
  add.pc = add.pulls.length;
  add.suc = add.pulls.filter(p => p.s).length;
  add.sr = ((add.suc / add.pc) * 100).toFixed(2) ;
  return add;
}

class AddressesStore extends BaseStore {
  getState(){
    let addys = _addresses
    return {
      addresses: addys.toIndexedSeq(),
    };
  }

  reduce(action,done){
    switch(action.type) {
      case 'addresses/query':
        request.get('/api/addresses').query(action.params).end((err,res) => {
          _addresses = Immutable.fromJS(_arrayToObj(res.body.addresses));
          done();
        });
        break;
      default:
        break;
     }
  }

};

window.AS = AddressesStore;

module.exports = new AddressesStore(Dispatcher);