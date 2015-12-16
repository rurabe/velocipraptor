'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class AddressesStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case 'addresses.state':
        return Immutable.fromJS(action.addresses);
      case 'addresses.merge':
        return state.mergeDeep(Immutable.fromJS(action.addresses));
      default:
        return state;
    }
  }
};

module.exports = new AddressesStore(Dispatcher);

