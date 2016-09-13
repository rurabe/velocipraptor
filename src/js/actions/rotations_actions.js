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
  create: function(datacenterId,text){
    const iplist = text.split("\n").filter(x => x);
    return new Promise(function(resolve,reject){
      request.post(`/api/datacenters/${datacenterId}/rotation`)
        .send({iplist: iplist})
        .end(resolve)
    });
  }
};

module.exports = AddressesActions;