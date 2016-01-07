'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class DatacentersStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case 'datacenters.state':
        return Immutable.fromJS(action.datacenters);
      case 'datacenters.merge':
        return state.mergeDeep(Immutable.fromJS(action.datacenters));
      default:
        return state;
    }
  }
};

module.exports = new DatacentersStore(Dispatcher);

