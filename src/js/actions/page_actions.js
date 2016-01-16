const Dispatcher = require('../dispatcher');

const PageActions = {
  dispatch: function(payload){
    Dispatcher.dispatch(payload);
  },
};

module.exports = PageActions;