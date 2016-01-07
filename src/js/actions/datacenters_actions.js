const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const DatacentersActions = {
  index: function(query){
    return new Promise(function(resolve,reject){
      request.get('/api/datacenters').query(query).end(_dr.bind(this,'datacenters.state',resolve,reject))
    });
  },
  get: function(id){
    return new Promise(function(resolve,reject){
      request.get(`/api/datacenters/${id}`).end(_dr.bind(this,'datacenters.merge',resolve,reject))
    })
  }
};

module.exports = DatacentersActions;