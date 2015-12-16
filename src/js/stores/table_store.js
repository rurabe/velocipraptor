'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');

class TableStore extends MapStore {
  getInitialState(){
    return Immutable.Map({
      sort_column: undefined,
      sort_direction: undefined,
      filters: Immutable.Map({}),
    });
  }

  reduce(state, action){
    switch (action.type) {
      case 'table.sort':
        return state.set('sort_column',action.column).set('sort_direction',action.direction);
      case 'table.filter':
        return state.setIn(['filters',action.column],action.criteria);
      default:
        return state;
    }
  }
};

module.exports = new TableStore(Dispatcher);

