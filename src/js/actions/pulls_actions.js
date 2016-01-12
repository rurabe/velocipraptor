const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const PullsActions = {
  index: function(query){
    return new Promise(function(resolve,reject){
      request.get(`/api/pulls`).query(query).end(_dr.bind(this,'pulls.merge',resolve,reject))
    });
  }
};

module.exports = PullsActions;