'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');
const moment = require('moment');

class TableStore extends MapStore {
  getInitialState(){
    return Immutable.Map({
      sort_column: undefined,
      sort_direction: undefined,
      start_date: moment().subtract(7,'days').format("YYYY-MM-DD"),
      end_date: moment().format("YYYY-MM-DD"),
      filters: Immutable.Map({}),
    });
  }

  reduce(state, action){
    switch (action.type) {
      case 'table.sort':
        return state.set('sort_column',action.column).set('sort_direction',action.direction);
      case 'table.filter':
        return state.setIn(['filters',action.column],action.criteria);
      case 'addresses.state':
        return state.set('start_date',action.start_date).set('end_date',action.end_date);
      default:
        return state;
    }
  }
};

module.exports = new TableStore(Dispatcher);

