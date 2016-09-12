'use strict';

const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const AddressesActions = {
  index: function(datacenterId){
    Dispatcher.dispatch({type: 'rotations.state'})
    return new Promise(function(resolve,reject){
      request.get(`/api/datacenters/${datacenterId}/rotation`).end(_dr.bind(this,'rotations.state',resolve,reject))
    });
  },
};

module.exports = AddressesActions;