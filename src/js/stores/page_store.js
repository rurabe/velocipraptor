'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class PageStore extends MapStore {
  getInitialState(){
    return Immutable.Map({
      dialog: null,
    });
  }

  reduce(state, action){
    switch (action.type) {
      case 'dialog.activate':
        return state.set('dialog',action.mode);
      case 'dialog.deactivate':
        return state.set('dialog',null);
      default:
        return state;
    }
  }
};

module.exports = new PageStore(Dispatcher);

