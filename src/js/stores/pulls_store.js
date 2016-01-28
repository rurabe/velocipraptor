'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class PullsStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case 'addresses.state':
        return Immutable.fromJS(action.pulls);
      case 'addresses.merge':
        return state.merge(Immutable.fromJS(action.pulls));
      default:
        return state;
    }
  }
};

module.exports = new PullsStore(Dispatcher);

