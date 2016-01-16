const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const ServerAssignmentsActions = {
  create: function(datacenterId,params){
    return new Promise(function(resolve,reject){
      request.post(`/api/datacenters/${datacenterId}/server_assignments`).send(params).end(_dr.bind(this,'addresses.merge',resolve,reject))
    });
  } 
};

module.exports = ServerAssignmentsActions;