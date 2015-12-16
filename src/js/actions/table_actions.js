const Dispatcher = require('../dispatcher');

const TableActions = {
  sort: function(column,direction){
    Dispatcher.dispatch({type: 'table.sort', column: column, direction: direction});
  },
  filter: function(column,criteria){
    Dispatcher.dispatch({type: 'table.filter', column: column, criteria: criteria});
  }
};

module.exports = TableActions;