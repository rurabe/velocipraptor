'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class RangesStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case 'ranges.state':
        return Immutable.fromJS(action.ranges);
      case 'ranges.merge':
        return state.merge(Immutable.fromJS(action.ranges));
      case 'ranges.remove':
        console.log(action)
        return Object.keys(action.ranges).reduce( (st,k) => { return st.delete(k) },state)
      default:
        return state;
    }
  }
};

module.exports = new RangesStore(Dispatcher);

