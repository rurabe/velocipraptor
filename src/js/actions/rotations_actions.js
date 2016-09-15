'use strict';

const request = require('superagent');
const Dispatcher = require('../dispatcher');

const _dr = Dispatcher.dispatchRequest;

const RotationsActions = {
  index: function(datacenterId){
    Dispatcher.dispatch({type: 'rotations.state'}); // clear rotations that may be in there
    Dispatcher.dispatch({type: 'rotations.create_status'}); // clear rotations that may be in there
    return new Promise(function(resolve,reject){
      request.get(`/api/datacenters/${datacenterId}/rotation`).end(_dr.bind(this,'rotations.state',resolve,reject))
    });
  },
  create: function(datacenterId,text){
    Dispatcher.dispatch({type: 'rotations.create_status', status: 'processing' });
    const iplist = text.split(/\r?\n/).filter(x => x);
    return new Promise(function(resolve,reject){
      request.post(`/api/datacenters/${datacenterId}/rotation`)
        .send({iplist: iplist})
        .end((err,res) => {
          if (err || !res.ok){
            console.log(err)
            Dispatcher.dispatch({type: 'rotations.create_status', status: 'failed'}); 
            resolve(); 
          } else {
            Dispatcher.dispatch({type: 'rotations.create_status', status: 'succeeded' });
            resolve(); 
          }
        });
    });
  }
};

module.exports = RotationsActions;