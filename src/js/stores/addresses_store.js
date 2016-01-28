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
        return state.merge(Immutable.fromJS(action.addresses));
      case 'ranges.remove':
        let rangeIds = Object.keys(action.ranges).map(parseInt);
        console.log(rangeIds)
        return state.filter( a => !rangeIds.includes(a.get('range_id')) )
      default:
        return state;
    }
  }
};

module.exports = new AddressesStore(Dispatcher);

