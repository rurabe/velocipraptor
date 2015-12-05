'use strict';

const Immutable = require('immutable');
const BaseStore = require('./base_store');
const request = require('superagent');

const Dispatcher = require('../dispatcher');

let _addresses = Immutable.Map();

const _arrayToObj = function(arr){
  return arr.reduce( (o,e) => {
    o[e.id] = e;
    return o;
  },{})
}

class AddressesStore extends BaseStore {
  getState(){
    return {
      addresses: _addresses,
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

module.exports = new AddressesStore(Dispatcher);