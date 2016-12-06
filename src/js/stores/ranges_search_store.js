'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class RangesSearchStore extends MapStore {
  getInitialState(){
    return Immutable.fromJS([]);
  }

  reduce(state, action){
    switch (action.type) {
    case 'ranges_search.state':
      return Immutable.fromJS(action.ranges);
    default:
      return state;
    }
  }
}

module.exports = new RangesSearchStore(Dispatcher);

