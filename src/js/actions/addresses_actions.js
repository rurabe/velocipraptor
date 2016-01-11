const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const AddressesActions = {
  index: function(query){
    return new Promise(function(resolve,reject){
      request.get('/api/addresses').query(query).end(_dr.bind(this,'addresses.merge',resolve,reject))
    });
  }
};

module.exports = AddressesActions;