'use strict';
const {MapStore} = require('flux/utils');
const Dispatcher = require('../dispatcher');
const Immutable = require('immutable');
const moment = require('moment-timezone');

const TimeHelpers = require('../helpers/time_helpers');

class TableStore extends MapStore {
  getInitialState(){
    return Immutable.Map({
      sort_column: undefined,
      sort_direction: undefined,
      start_date: TimeHelpers.pt(moment()).startOf('day').subtract(7,'days').toISOString(),
      end_date: TimeHelpers.pt(moment()).endOf('day').toISOString(),
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

