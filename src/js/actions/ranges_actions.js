const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const RangesActions = {
  index: function(query){
    return new Promise(function(resolve,reject){
      request.get(`/api/ranges`).query(query).end(_dr.bind(this,'ranges.merge',resolve,reject))
    });
  },
  update: function(id,update){
    return new Promise(function(resolve,reject){
      request.put(`/api/ranges/${id}`).send({update: update}).end(_dr.bind(this,'ranges.merge',resolve,reject))
    });
  }
};

module.exports = RangesActions;