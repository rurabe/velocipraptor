const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const DatacentersActions = {
  index: function(query){
    return new Promise(function(resolve,reject){
      request.get('/api/datacenters').query(query).end(_dr.bind(this,'datacenters.state',resolve,reject))
    });
  },
  update: function(id,update){
    return new Promise(function(resolve,reject){
      request.put(`/api/datacenters/${id}`).send({update: update}).end(_dr.bind(this,'datacenters.merge',resolve,reject))
    });
  }
};

module.exports = DatacentersActions;