const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const ServersActions = {
  index: function(query){
    return new Promise(function(resolve,reject){
      request.get(`/api/servers`).query(query).end(_dr.bind(this,'servers.merge',resolve,reject))
    });
  },
  update: function(id,update){
    return new Promise(function(resolve,reject){
      request.put(`/api/servers/${id}`).send({update: update}).end(_dr.bind(this,'servers.merge',resolve,reject))
    });
  }
};

module.exports = ServersActions;