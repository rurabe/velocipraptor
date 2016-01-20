'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class ServersStore extends MapStore {
  reduce(state, action){
    switch (action.type) {
      case 'servers.state':
        return Immutable.fromJS(action.servers);
      case 'servers.merge':
        return state.mergeDeep(Immutable.fromJS(action.servers));
      case 'servers.remove':
        return Object.keys(action.servers).reduce( (s,k) => { return s.delete(k) },state)
      default:
        return state;
    }
  }
};

module.exports = new ServersStore(Dispatcher);

