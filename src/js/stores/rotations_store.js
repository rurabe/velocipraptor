'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class RotationsStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case 'rotations.state':
        return Immutable.fromJS({rotation: action.rotation});
      default:
        return state;
    }
  }
};

module.exports = new RotationsStore(Dispatcher);

